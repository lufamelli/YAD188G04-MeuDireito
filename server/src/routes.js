const express = require('express');

const UserControler = require('./controler/UserControler');
const {authAccount, isEmailRegistered} = require('./middlewares');

const routes= express.Router();

routes.get('/', function(req,res){
  res.json({ message: "Backend em progresso"})
})
//user routes
routes.get('/user', UserControler.index);
routes.get('/user/:_id', UserControler.findId);
routes.post('/user', UserControler.createUser);
routes.delete('/user/:_id', UserControler.delete);
routes.put('/user/', UserControler.update);
routes.post('/user/login', UserControler.login);
routes.get('/user/checktoken', UserControler.checkToken);
//lawyer routes
routes.post('/lawyer', authAccount(["lawyer"]), UserControler.createLawyer);
routes.put('/lawyer/', authAccount(["lawyer"]), UserControler.updateLawyer);


module.exports = routes;