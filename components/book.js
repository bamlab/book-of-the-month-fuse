var bind = require("/components/bind.js");

var Book = function(book) {
  this.title = book.title;
  this.votes = book.votes;
  
  this.addVote = bind(this._addVote, this);
};

Book.prototype._addVote = function _addVote() {
  this.votes++;
  console.log(this.votes);
};

module.exports = Book;
