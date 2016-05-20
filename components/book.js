var Observable = require("FuseJS/Observable");
var bind = require("/components/bind.js");

var Book = function(book) {
  this.id = new Observable(book.id);
  this.title = new Observable(book.title);
  this.votes = new Observable(book.votes);
  this.voted = new Observable(book.voted);

};

module.exports = Book;
