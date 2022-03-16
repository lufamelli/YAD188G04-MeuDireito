const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const routes = require('./src/routes')
const mongoose = require('mongoose')

const expressIni = express() 

mongoose.connect('mongodb://localhost:27017/TCCMeuDireito', {
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

expressIni.listen(3003, function(){
  console.log("Server started")
})
