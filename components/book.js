var Observable = require("FuseJS/Observable");
var bind = require("/components/bind.js");

var Book = function(book) {
  this.title = new Observable(book.title);
  this.votes = new Observable(book.votes);
  this.voted = new Observable(false);
  
  this.toggleVote = bind(this._toggleVote, this);
};

Book.prototype._toggleVote = function _toggleVote() {
  if(this.voted.value) {
    this.voted.value = false;
    this.votes.value--;
    return 
  }
  
  this.voted.value = true;
  this.votes.value++;
};

module.exports = Book;
