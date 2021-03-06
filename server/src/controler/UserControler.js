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
      const { firstName, lastName, email, password, cPassword } = req.body;

      let generateData = {}
      generateData = {
        firstName, lastName, email, password, cPassword
      }

      console.log(password, cPassword)

      const usedEmail = await account.findOne({email})

      if(usedEmail) {
        res.status(403).json({message:"Email ja cadastrado." })
      }
      else if(password !== cPassword) {
        res.status(403).json({message:"Senhas não conferem" })
      }
      else {
        console.log(password, cPassword)
        const users = account.create(generateData); 
        res.json(users) 
      }
      
  },

  async update(req,res){
    const { _id, firstName, lastName, email, password, role } = req.body;

    let generateData = {}
    generateData = {
      firstName, lastName, email, password, role
    }
    if (_id.match(/^[0-9a-fA-F]{24}$/)) {
      const users = await account.findByIdAndUpdate((_id), generateData, {new: true}); // SELECT * FROM users
    res.json(users)
    }
    
  },

  async delete(req,res){
    const {_id}= req.params
    if (_id.match(/^[0-9a-fA-F]{24}$/)) {
      const users = await account.findByIdAndDelete({_id})// SELECT * FROM users where Id= ...
    res.json(users)
    }
    
  },

  //lawyer controller 

  async createLawyer(req,res){
    const { firstName, lastName, email, password, oabNumber, cpf, role } = req.body;

    let generateData = {}
    generateData = {
      firstName, lastName, email, password, oabNumber, cpf, role
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

  async updateLawyer(req,res){
    const { _id, firstName, lastName, email, password, oabNumber, cpf, role } = req.body;

    let generateData = {}
    generateData = {
      firstName, lastName, email, password, oabNumber, cpf, role
    }
    if (_id.match(/^[0-9a-fA-F]{24}$/)){
      const users = await account.findByIdAndUpdate((_id), generateData, {new: true}); // SELECT * FROM users
    res.json(users)
    }
    
  },

  async login(req,res){
    const {email, password, _id, firstName, lastName, oabNumber}= req.body;
    account.findOne({email:email }, function(err,account){
      if(err) {
        console.log(err);
        res.status(200).json({erro: "Erro no servidor, tente novamente"});
      }
      else if(!account) {
        res.status(200).json({status:2, error: `E-mail e/ou senha não conferem`})
      }
      else {
        account.isCorrectPassword(password, async function(err, same) {
          if(err) {
            res.status(200).json({error: "Erro no servidor, tente novamente"})
          }
          else if(!same) {
            res.status(200).json({status: 2, error:"SENHAE-mail e/ou senha não conferem."})
          }
          else {
            const payload = {_id};
            token = jwt.sign(payload, secret, {
              expiresIn: '24h'
            });
            res.cookie('token ', token, {httpOnly: true});
            res.status(200).json({status:1, auth: true, token: token, _id: account._id, firstName: account.firstName, lastName: account.lastName, oabNumber: account.oabNumber})
          }
        })
      }
    })
  },
  async checkToken(req,res){
    const token = req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token'];
    if(!token){
        res.json({status:401,msg:'Não autorizado: Token inexistente!'});
    }else{
        jwt.verify(token, secret, function(err, decoded){
            if(err){
                res.json({status:401,msg:'Não autorizado: Token inválido!'});
            }else{
                res.json({status:200})
            }
        })
    }
  },
  async teste(req,res){
    const user = await account.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.firstName,
      email: user.email,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
    /*const token = req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token'];
    if(!token){
        //res.json({status:401,msg:'Não autorizado: Token inexistente!'});
        try{
          const decoded = jwt.verify(token, secret)
          console.log(decoded)
          next();
        }
        catch(err){
          console.log(err)
        }
        
                res.json({status:401,msg:'Não autorizado: Token inválido!'});
            }else{
                res.json({status:200})
            }
        })
    }*/
  },
  async logout(req,res){
      const token = req.headers.token;
      if(token){
          res.cookie('token',null,{httpOnly:true});
      }else{
          res.status(401).send("Falha no logout.")
      }
      res.send("Logout concluído.");
  }
}
