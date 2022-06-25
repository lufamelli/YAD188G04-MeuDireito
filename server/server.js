const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const routes = require('./src/routes')
const mongoose = require('mongoose')

const expressIni = express() 

// first change for heroku deploy
const PORT = process.env.PORT || 3003

// second change for heroku deploy
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TCCMeuDireito', {
  useUnifiedTopology: true,
  useNewUrlParser: true
}, function(err){
  if(err){
    console.log(err)
  }else{
    console.log('mongodb connected')
  }
})

expressIni.use(cors())
expressIni.use(cookieParser())
expressIni.use(express.json())
expressIni.use(routes)

// third change for heroku deploy
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'))
}

expressIni.listen(PORT, function(){
  console.log("Server started")
})
