var Observable = require("FuseJS/Observable");

var books = Observable(
  {title: 'Hello'},
  {title: 'Hello World'},
  {title: 'Hello BAM'}
);

module.exports = {
  books : books,
};
