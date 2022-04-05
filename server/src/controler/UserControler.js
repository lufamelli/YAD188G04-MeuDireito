//em todo lugar que era user coloquei account
const account = require('../model/user')
const jwt = require("jsonwebtoken");
const secret = "mysecret";
const authAccount =  require("../middlewares")

module.exports = {
  async index(req,res){
    const users = await account.find()
    res.json(users)
  },

  async findId(req,res){
    const {_id}= req.params
    const users = await account.findOne({_id})// SELECT * FROM users where Id= ...
    res.json(users)
  },

  async createUser(req,res){ 
      const { firstName, lastName, email, password, role } = req.body;

      let generateData = {}
      generateData = {
        firstName, lastName, email, password, role
      }

      const usedEmail = await account.findOne({email})

      if(usedEmail) {
        res.status(403).json({message:"Email ja cadastrado." })
      }
      else {
        const users = await account.create(generateData); // SELECT * FROM users
        res.json(users) 
      }
  },

  async update(req,res){
    const { _id, firstName, lastName, email, password, role } = req.body;

    let generateData = {}
    generateData = {
      firstName, lastName, email, password, role
    }
    const users = await account.findByIdAndUpdate((_id), generateData, {new: true}); // SELECT * FROM users
    res.json(users)
  },

  async delete(req,res){
    const {_id}= req.params
    const users = await account.findByIdAndDelete({_id})// SELECT * FROM users where Id= ...
    res.json(users)
  },

  //lawyer controller 

  async createLawyer(req,res){
    const { firstName, lastName, email, password, oabNumber, cpf, role } = req.body;

      let generateData = {}
      generateData = {
        firstName, lastName, email, password, oabNumber, cpf, role
      }
      const users = await account.create(generateData); // SELECT * FROM users
      res.json(users)
      //return res.json({message: 'Email ja cadastrado, faça login.'})

  },

  async updateLawyer(req,res){
    const { _id, firstName, lastName, email, password, oabNumber, cpf, role } = req.body;

    let generateData = {}
    generateData = {
      firstName, lastName, email, password, oabNumber, cpf, role
    }
    const users = await account.findByIdAndUpdate((_id), generateData, {new: true}); // SELECT * FROM users
    res.json(users)
  },

  async login(req,res){
    const {email, password, _id, firstName, lastName}= req.body;
    account.findOne({email: email }, function(err,account){
      if(err) {
        console.log(err);
        res.status(200).json({erro: "Erro no servidor, tente novamente"});
      }
      else if(!account) {
        res.status(200).json({status:2, error: "E-mail e/ou senha não conferem"})
      }
      else {
        account.isCorrectPassword(password, async function(err, same) {
          if(err) {
            res.status(200).json({error: "Erro no servidor, tente novamente"})
          }
          else if(!same) {
            res.status(200).json({status: 2, errorrr:"E-mail e/ou senha não conferem."})
          }
          else {
            const payload = {email};
            token = jwt.sign(payload, secret, {
              expiresIn: '24h'
            });
            res.cookie('token ', token, {httpOnly: true});
            res.status(200).json({status:1, auth: true, token: token, _id: account._id, firstName: account.firstName, lastName: account.lastName})
            req.token = token;
            if(!token) {
              req.json({status:401, message:"Token não foi gerado" })
            }
            else {
              jwt.verify(token, secret, function(err, decoded) {
                if(err) {
                  req.json({status:401, message:'Token inválido'})
                }
                else {
                  req.email = decoded.email;
                  res.json({status:200})
                }
              })
            }
          }
        })
      }
    })
  },

  async checkToken(req,res){
    const token = req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token']
  }
}