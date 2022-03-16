const express = require('express');

const UserControler = require('./controler/UserControler');

const routes= express.Router();

routes.get('/', function(req,res){
  res.json({ message: "Backend em progresso"})
})

routes.get('/user', UserControler.index);
routes.get('/user/:_id', UserControler.findId);
routes.post('/user', UserControler.createUser);
routes.delete('/user/:_id', UserControler.delete);
routes.put('/user/', UserControler.update);
routes.post('/user/login', UserControler.login);


module.exports = routes;