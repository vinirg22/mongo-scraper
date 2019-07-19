var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NoteDb = new Schema({
  title: String,
  body: String
});

var Note = mongoose.model("Note", NoteDb);

module.exports = Note;