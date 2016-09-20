'use strict';

//node modules
const fs = require('fs');
const http = require('http');
const url = require('url');
const queryString = require('querystring');

// npm modules
const cowsay = require('cowsay');

// app moduels
const parseBody = require('./lib/parse-body.js');

// module constatns
const PORT = process.env.PORT || 3000;

// module logic
const server = http.createServer(function(req, res){
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);
  console.log('req.url', req.url);
  console.log('req.method', req.method);
  console.log('req.headers', req.headers);

  res.write(cowsay.say({text: 'hello there'}));
  res.end();
  return;

  if (req.method === 'POST'){
    parseBody(req, function(err){
      if (err) return console.error(err);
    });
  }

  if (req.method === 'GET' && req.url.pathname === '/home'){
    fs.createReadStream('./server.js').pipe(res);
  }

  res.statusCode = 404;
  res.write('to bad');
  res.end();
});

server.listen(PORT, function(){
  console.log('server up (:>-<-<', PORT);
});
