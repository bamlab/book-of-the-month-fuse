var InterApp = require("FuseJS/InterApp");
var Observable = require("FuseJS/Observable");
var storage = require('FuseJS/Storage');
var Book = require('/components/book.js');
var localPush = require('/components/localPush');
var config = require('/config');

var books = Observable();
var showLoginButton = Observable(true);

localPush.registerNotification();
var authToken = null;
var memberId = null;

function startTrelloAuth(){
	var uri = 'https://trello.com/1/authorize?expiration=never';
	uri += '&name=' + config.trelloAppName;
	uri += '&key=' + config.trelloKey;
	uri += '&scope=read,write';
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

function fetchBooks(){
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
      books.add(new Book({
				id: book.id,
        title: book.name,
        votes: book.badges.votes,
        voted: book.badges.viewingMemberVoted
      }));
    });
		showLoginButton.value = false;
	})
	.then(function(){
		fetchUserId();
	}).catch(function(err){
		console.error(JSON.stringify(err));
	});
}

function checkConnexion() {
	var authToken = storage.readSync('token');
	if (authToken) {
		showLoginButton.value = false;
		fetchBooks(authToken);
	}
}

InterApp.onReceivedUri = function(uri){
	var authToken = extractAuthToken(uri);
	storage.writeSync('token', authToken);
	fetchBooks(authToken);
};

checkConnexion()
	authToken = extractAuthToken(uri);
	fetchBooks();
};

fetchUserId = function() {
	var uri = 'https://api.trello.com/1/members/me?';
	uri += 'key=' + config.trelloKey;
	uri += '&token=' + authToken;

	fetch(uri, {
		method: "GET",
		headers: { "Accept": "application/json"}
	}).then(function(response){
		return response.json();
	}).then(function(responseObject){
    memberId = responseObject.id;
	}).catch(function(err){
		console.error(JSON.stringify(err));
	});
};

/* Voting feature */
voteForBook = function(book) {
	var cardId = book.data.id._values[0];
	var uri = 'https://api.trello.com/1/cards/' + cardId + '/membersVoted?';
	uri += 'key=' + config.trelloKey;
	uri += '&token=' + authToken;


	fetch(uri, {
		method: "POST",
		headers: { "Accept": "application/json", 'Content-Type': 'application/json'},
		body: JSON.stringify({
			value: memberId
		})
	}).then(function(response){
		if (response.status === 200) {
			fetchBooks();
		}
	}).catch(function(err){
		console.error(JSON.stringify(err));
	});
}

module.exports = {
  books : books,
  startTrelloAuth: startTrelloAuth,
  showLoginButton: showLoginButton,
	voteForBook: voteForBook
};
