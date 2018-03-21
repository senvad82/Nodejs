
const fs = require('fs');
var notes = [];

var fetchNotes = () => {
  notes = [];
  try{
    var existingNotes = fs.readFileSync('notes-data.json');
    notes = JSON.parse(existingNotes);
  }catch(e){

  }
  return notes;
}

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json',JSON.stringify(notes));
}

var addNote = (title, body) => {
    notes = fetchNotes();
    var note ={
      title,
      body
    };


    var duplicateNotes = notes.filter((note) => note.title===title);
    if(duplicateNotes.length === 0){
      notes.push(note);
      saveNotes(notes);
      return note;
    }

};

var getAll = () => {
    console.log('Get All Note');
};

var read = (title) => {
    console.log('read note', title);
    notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title===title);
    return filteredNotes[0];
};

var remove = (title) => {
      notes = fetchNotes();
      var filteredNotes = notes.filter((note) => note.title!=title);
      console.log(filteredNotes);
      saveNotes(filteredNotes);
      return filteredNotes.length != notes.length;
};

var lognote = (note) => {
  debugger;
  console.log('Note');
  console.log('--');
  console.log(`title:${note.title}`);
  console.log(`body:${note.body}`);
};

module.exports = {
  addNote,
  getAll,
  read,
  remove,
  lognote
};
