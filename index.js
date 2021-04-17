const express = require('express');
const os = require("os");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const fs = require("fs");
const io = require("socket.io");


app.use(express.static('public'));
app.listen(3000);

app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(cors({
  origin: 'https://wispkoe.repl.co/'
}));
app.use(bodyParser.json());

app.post('/new-post', function (req, res) {
   
   if(req.get('referer') == 'https://29e5be10-b642-4d0a-9da1-ffb715d4c97c.id.repl.co/'){
       var post = JSON.stringify(req.body);
  
  res.redirect("https://wispkoe.repl.co");
  
  fs.readFile("public/posts.json", function (err, data) {
    
    var json = JSON.parse(data);
    json.push(post);
    
    fs.writeFile("public/posts.json", JSON.stringify(json), function(err, result){ if(err) console.log('error', err)
  
  });
  });
   } else {
     res.end("Error");
   }
    
  });