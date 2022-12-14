
// NodeJs program for proxy forwarding.

// package variables
let cors = require('cors');
require('dotenv').config();
const fetch = require('node-fetch');
const express = require('express');

// global variables
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require("fs")

// configure cors pass through
app.use(cors({origin: '*'}));


// cfd endpoint
app.get('/cfd/:endpoint/:endpoint2?', function(req, res){
  let urlArgs = req.query;
  let argString = "?";
  for (let i=0; i<Object.keys(urlArgs).length; i++){
    argString = argString + Object.keys(urlArgs)[i] + "=" + Object.values(urlArgs)[i] + "&";
  }
  let endpoint = "";
  if(!req.params.endpoint2){
    endpoint = 'https://api.collegefootballdata.com/'+req.params.endpoint+argString;
  } else{
    endpoint = 'https://api.collegefootballdata.com/'+req.params.endpoint+"/"+req.params.endpoint2+argString;
  }
  console.log(endpoint);
  argString = argString.slice(0,-1);
  console.log(argString);
  console.log('here');
  fetch(endpoint,{
    headers:{
      accept: 'application/json',
      Authorization: `Bearer ${process.env.BEARER}`
    }
  })
  .then(response => {
       return response.json()})
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


// youtube endpoint
app.get('/yt/:endpoint', function(req, res){
  let urlArgs = req.query;
  let argString = "?";
  for (let i=0; i<Object.keys(urlArgs).length; i++){
    argString = argString + Object.keys(urlArgs)[i] + "=" + Object.values(urlArgs)[i] + "&";
  }
  argString = argString.slice(0,-1);
  console.log(argString);
  console.log('here');
  fetch('https://www.googleapis.com/youtube/v3/'+req.params.endpoint+argString+`&key=${process.env.YOUTUBEAPIKEY}`)
  .then(response => {
       return response.json()})
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

// news endpoint
app.get('/news/:endpoint', function(req, res){
  let urlArgs = req.query;
  let argString = "?";
  for (let i=0; i<Object.keys(urlArgs).length; i++){
    argString = argString + Object.keys(urlArgs)[i] + "=" + Object.values(urlArgs)[i] + "&";
  }
  argString = argString.slice(0,-1);
 
  fetch('https://newsapi.org/v2/'+req.params.endpoint+argString+`&apiKey=${process.env.NEWSAPIKEY}`,{
    
  })
  .then(response => {
       return response.json()})
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


//start listenint for incoming requests
app.listen(PORT);

