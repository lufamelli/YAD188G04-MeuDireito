const express = require('express');
const PostController = require('./controler/PostController');
const UserControler = require('./controler/UserControler');
const {authAccount, isEmailRegistered} = require('./middlewares');

const routes= express.Router();

routes.get('/', function(req,res){
  res.json({ message: "Backend rodando"})
})

//user routes
routes.get('/user', UserControler.index);
routes.get('/user/:_id', UserControler.findId);
routes.post('/user', UserControler.createUser);
routes.delete('/user/:_id', UserControler.delete);
routes.put('/user/', UserControler.update);
routes.post('/user/login', UserControler.login);
routes.get('/user/checktoken', UserControler.checkToken);
routes.get('/user/logout', UserControler.logout);

//postd routers
routes.get('/post', PostController.index);
routes.post('/post', PostController.search);
/*routes.get('/post', (req, res) => {
  let text = req.body.searchText;
  let findProps = {};
  let skip = parseInt(req.body.skip);

  if(text) {
    PostController.find(findProps)
      .find({ $text: { $search: text } })
      .skip(skip)
      .exec((posts) => {
        res.json(posts);
      })
  }
  else {
    PostController.find(findProps)
        .skip(skip)
        .exec((posts) => {
          res.json(posts);
        })
  }
});*/
routes.get('/post/:_id', PostController.details);
routes.post('/post/create', PostController.create);
routes.delete('/post/:_id', PostController.delete);
routes.put('/post/', PostController.update);


//lawyer routes
routes.post('/lawyer', authAccount(["lawyer"]), UserControler.createLawyer);
routes.put('/lawyer/', authAccount(["lawyer"]), UserControler.updateLawyer);


module.exports = routes;