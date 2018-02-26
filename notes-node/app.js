console.log('starting app');

const fs = require('fs');
const ld = require('lodash');

const notes = require('./notes.js');
const yarg = require('yargs');
const titleOptions = {
  describe: 'title of body',
  demand: true,
  alias: 't'
};
const bodyOptions = {
  describe: 'body content',
  demand: false,
  alias: 'b'
};

const argv = yarg
  .command('add','adds a node',{
    title :titleOptions,
    body :bodyOptions
  })
  .command('list','lists all node')
  .command('read','reads a node',{
    title :titleOptions,
  })
  .command('remove','removes a node',{
    title :titleOptions,
  })
  .help()
  .argv;

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
  var allnotes = notes.getAll();
  console.log(allnotes);
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
