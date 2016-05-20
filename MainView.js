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
	var uri = "https://api.trello.com/1/members/guitoof?";
	uri += "accessToken=" + c;
	uri += "&accessTokenSecret=24d5315f732bc79f186a5c8d0b4d8bffa47871e2b9b4ce665dcec9ec634562b0";

	fetch(uri, {
		method: "GET",
		headers: { "Accept": "application/json"}
	}).then(function(response){
    console.log(JSON.stringify(response));
		return response.json();
	}).then(function(responseObject){
    console.log("responseObject", JSON.stringify(responseObject));
		accessToken.value = responseObject.access_token;
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
