const user = require('../model/user')
const jwt = require("jsonwebtoken");
const secret = "mysecret";

module.exports = {
  async index(req,res){
    const users = await user.find()
    res.json(users)
  },

  async findId(req,res){
    const {_id}= req.params
    const users = await user.findOne({_id})// SELECT * FROM users where Id= ...
    res.json(users)
  },

  async createUser(req,res){
    const { firstName, lastName, email, password } = req.body;

    let generateData = {}
    generateData = {
      firstName, lastName, email, password
    }
    const users = await user.create(generateData); // SELECT * FROM users
    res.json(users)
  },

  async update(req,res){
    const { _id, firstName, lastName, email, password } = req.body;

    let generateData = {}
    generateData = {
      firstName, lastName, email, password
    }
    const users = await user.findByIdAndUpdate((_id), generateData, {new: true}); // SELECT * FROM users
    res.json(users)
  },

  async delete(req,res){
    const {_id}= req.params
    const users = await user.findByIdAndDelete({_id})// SELECT * FROM users where Id= ...
    res.json(users)
  },

  async login(req,res){
    const {email, password, _id, firstName, lastName}= req.body;
    user.findOne({email: email }, function(err,user){
      if(err) {
        console.log(err);
        res.status(200).json({erro: "Erro no servidor, tente novamente"});
      }
      else if(!user) {
        res.status(200).json({status:2, error: "E-mail e/ou senha não conferem"})
      }
      else {
        user.isCorrectPassword(password, async function(err, same) {
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
            res.status(200).json({status:1, auth: true, token: token, _id: user._id, firstName: user.firstName, lastName: user.lastName})
          }
        })
      }
    })
  },
}