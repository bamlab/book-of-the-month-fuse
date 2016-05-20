var Observable = require("FuseJS/Observable");
var Book = require("/components/book.js");

var books = Observable(
  new Book({title: 'Guerre et paix', votes : 10}),
  new Book({title: 'Harry Poter', votes : 3}),
  new Book({title: 'Hello BAM', votes : 10})
);

module.exports = {
  books : books,
};
