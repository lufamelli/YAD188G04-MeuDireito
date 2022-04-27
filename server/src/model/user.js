const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Account = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  oabNumber: String,
  cpf: String,
  role: String
},{
  timestamps: true
})

Account.pre('save',function(next) {
  if(!this.isModified("password")){
    return next();
  }
  this.password = bcrypt.hashSync(this.password,10);
  next();
});

Account.pre('findOneAndUpdate',function(next) {
  var password = this.getUpdate().password+'';
  if(!password.length < 55){
    this.getUpdate().password = bcrypt.hashSync(password,10);
  }
  next();
});

Account.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password,this.password,function (err,same){
    if (err) {
      callback(err);
    }
    else {
      callback(err, same);
    }
  })
}

Account.methods.isEmailRegistered = async function(email){
  try {
    const usedEmail = await this.findOne({email})
    if(usedEmail) {
      return false;
    } 
    else {
      return true
    }  
  } catch (err) {
    console.log('Erro na verificação de email', err.message);
    return false;
  }
  
}

const account = mongoose.model('User', Account)
module.exports = account;  