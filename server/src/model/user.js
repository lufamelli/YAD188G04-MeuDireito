const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
},{
  timestamps: true
})

Schema.pre('save',function(next) {
  if(!this.isModified("password")){
    return next();
  }
  this.password = bcrypt.hashSync(this.password,10);
  next();
});

Schema.pre('findOneAndUpdate',function(next) {
  var password = this.getUpdate().password+'';
  if(!password.length < 55){
    this.getUpdate().password = bcrypt.hashSync(password,10);
  }
  next();
});

Schema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password,this.password,function (err,same){
    if (err) {
      callback(err);
    }
    else {
      callback(err, same);
    }
  })
}

const user = mongoose.model('User', Schema)
module.exports = user;