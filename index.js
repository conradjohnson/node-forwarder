let cors = require('cors');
require('dotenv').config();
const fetch = require('node-fetch');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors({origin: '*'}));
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
  .then(response => response.json())
  .then(data => {
    //console.log(data);
    res.json(data)
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