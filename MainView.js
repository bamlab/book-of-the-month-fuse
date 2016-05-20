var InterApp = require("FuseJS/InterApp");
var Observable = require("FuseJS/Observable");
var Book = require('/components/book.js');
var config = require('/config');

var books = Observable();

function startTrelloAuth(){
	var uri = 'https://trello.com/1/authorize?expiration=never';
	uri += '&name=' + config.trelloAppName;
	uri += '&key=' + config.trelloKey;
	uri += '&redirect_uri=' + config.trelloLoginRedirectUri;
	InterApp.launchUri(uri);
}

function extractAuthToken(uri){
	var codeStart = uri.substring(uri.search("code="), uri.length);
	var codeEnd = codeStart.search("&");
	if (codeEnd === -1)
		codeEnd = codeStart.length;
	code = codeStart.substring(0, codeEnd).split("=")[1];
	return code;
}

function fetchBooks(authToken){
	var uri = 'https://api.trello.com/1/lists/' + config.booksListId + '/cards?';
	uri += 'key=' + config.trelloKey;
	uri += '&token=' + authToken;

	fetch(uri, {
		method: "GET",
		headers: { "Accept": "application/json"}
	}).then(function(response){
		return response.json();
	}).then(function(responseObject){
    books.clear();
    responseObject.map(function(book) {
      books.add({ title: book.name, votes: book.badges.votes });
    });
	}).catch(function(err){
		console.error(JSON.stringify(err));
	});
}

InterApp.onReceivedUri = function(uri){
	var authToken = extractAuthToken(uri);
	fetchBooks(authToken);
};

module.exports = {
  books : books,
  startTrelloAuth: startTrelloAuth
};
