const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('upper',(text)=>{
  return text.toUpperCase();
});
app.set('view engine', 'hbs');


app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}:${req.method}: ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    console.log(err);
  });
  next();
});

//app.use((req,res,next)=>{
  //res.render('error.hbs',{headertext:'hometest',bodytext1:'hometext1',bodytext2:'hometext2',footertext:'homefooter'});
//});

app.use(express.static(__dirname + '/public'));

app.get('/',(req, res)=>{
  res.render('home.hbs', {headertext:'hometest',bodytext1:'hometext1',bodytext2:'hometext2',footertext:'homefooter'});
});

app.get('/about',(req, res)=>{
  res.render('about.hbs',{headertext:'headertest',bodytext1:'text1',bodytext2:'text2',footertext:'footer'});
});

app.get('/bad',(req,res)=>{
  res.send('Bad Request');
})

app.listen(port, ()=>{
  console.log('App starting');
});
