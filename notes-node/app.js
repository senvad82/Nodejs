console.log('starting app');

const fs = require('fs');
const ld = require('lodash');

const notes = require('./notes.js');
const yarg = require('yargs')
const argv = yarg.argv;

var command = argv._[0];

if(command ==='add'){
  var note = notes.addNote(argv.title, argv.body);
  if(note){
    notes.lognote(note);
  }
  else{
    console.log('note already taken')
  }
}
if(command ==='list'){
  notes.getAll();
}

if(command ==='read'){
  var note = notes.read(argv.title);
  notes.lognote(note);
}

if(command === 'remove'){
  console.log('remove started');
  var result = notes.remove(argv.title);
  console.log(result);
  if(result){
    console.log('note removed');
  }
  else{
    console.log('no note deleted');
  }
}
