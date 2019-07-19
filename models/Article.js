var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleDb = new Schema({

  title: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true
  },

  snippet: {
    type: String,
  },
  
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  },

  isSaved: {
    type: Boolean,
    default: false
  },

  newArticle: {
    type: Date,
    default: Date.now
  }
});

var Article = mongoose.model("Article", ArticleDb);

module.exports = Article;