var InterApp = require("FuseJS/InterApp");
var Observable = require("FuseJS/Observable");
var Book = require("/components/book.js");

var books = Observable(
  new Book({title: 'Guerre et paix', votes : 10}),
  new Book({title: 'Harry Poter', votes : 3}),
  new Book({title: 'Hello BAM', votes : 10})
);

function startTrelloAuth(){
	var uri = "https://trello.com/1/authorize?expiration=never&name=BamBooks&key=YOUR_API_KEY_HERE&redirect_uri=fusebooks://fusebooks/code";
	InterApp.launchUri(uri);
}

function extractCode(uri){
	var codeStart = uri.substring(uri.search("code="), uri.length);
	var codeEnd = codeStart.search("&");
	if (codeEnd === -1)
		codeEnd = codeStart.length;
	code = codeStart.substring(0, codeEnd).split("=")[1];
	return code;
}

function getMe(c){
	var uri = "https://api.trello.com/1/lists/573ec5ee023afbbe3feb5f86/cards?key=YOUR_API_KEY_HERE&";
	uri += "token=" + c;

	fetch(uri, {
		method: "GET",
		headers: { "Accept": "application/json"}
	}).then(function(response){
    console.log(JSON.stringify(response));
		return response.json();
	}).then(function(responseObject){
    console.log("responseObject", JSON.stringify(responseObject));
    books.clear();
    responseObject.map(function(book) {
      books.add({title: book.name});
    });
	}).catch(function(err){
		console.log("err", JSON.stringify(err));
	});
}

InterApp.onReceivedUri = function(uri){
	var c = extractCode(uri);
  console.log(c);
	getMe(c);
};

module.exports = {
  books : books,
  startTrelloAuth: startTrelloAuth
};
