var Observable = require("FuseJS/Observable");
var bind = require("/components/bind.js");

var Book = function(book) {
  this.title = new Observable(book.title);
  this.votes = new Observable(book.votes);
  
  this.addVote = bind(this._addVote, this);
};

Book.prototype._addVote = function _addVote() {
  this.votes.value++;
};

module.exports = Book;
