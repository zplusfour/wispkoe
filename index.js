const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require("fs");
const io = require("socket.io");
const rateLimit = require("express-rate-limit");


app.use(express.static('public'));
app.listen(3000);

app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(bodyParser.json());

const postLimit = rateLimit({
  windowMs: 20 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message:
    "Too many posts from this IP at a time, please wait 20 minutes."
});

app.post('/new-post', postLimit, function (req, res) {
   
  var post = JSON.stringify(req.body);
  
  res.redirect("https://wispkoe.repl.co");
  
  fs.readFile("public/posts.json", function (err, data) {
    
    var json = JSON.parse(data);
    json.push(post);
    
    fs.writeFile("public/posts.json", JSON.stringify(json), function(err, result){ if(err) console.log('error', err);
  
  });
  });
  });
= 