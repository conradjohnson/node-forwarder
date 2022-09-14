let cors = require('cors');
require('dotenv').config();
const fetch = require('node-fetch');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require("fs")


app.use(cors({origin: '*'}));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested, Content-Type, Accept Authorization"
//   )
//   if (req.method === "OPTIONS") {
//     res.header(
//       "Access-Control-Allow-Methods",
//       "POST, PUT, PATCH, GET, DELETE"
//     )
//     return res.status(200).json({})
//   }
//   next()
// })

app.get('/records', function(req, res){
  // req.query
  let urlArgs = req.query;
  let argString = "?";
  for (let i=0; i<Object.keys(urlArgs).length; i++){
    argString = argString + Object.keys(urlArgs)[i] + "=" + Object.values(urlArgs)[i] + "&";
  }
  argString = argString.slice(0,-1);
  console.log(argString);
  
  fetch('https://api.collegefootballdata.com/records'+argString,{
    headers:{
      accept: 'application/json',
      Authorization: process.env.BEARER
    }
  })
  .then(response => {
    if (response.status===200){
   return response.json()}
  else{
   return response.text()
  }})
  .then(data => {
    //console.log(data);
    res.json(data)
  })
  .catch(err => {


    fs.appendFile("./log.txt", JSON.stringify(err), function(err){


        if(err)
        {
          console.log(err)
        }
    })
      res.json(err.message)

  })
})

app.listen(PORT);

// app.use('/api', createProxyMiddleware({ 
//     target: 'api.collegefootballdata.com/records', changeOrigin: true,  logger: console
// }));



//headers: { 
  //  'Access-Control-Allow-Origin' : '*',
   // 'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//  },