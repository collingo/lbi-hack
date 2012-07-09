/**
 * ==========================
 *   LBi Hack Sessions 2012
 *         Team Who?
 * ==========================
 * 
 * Server Module
 * -------------
 * Sets up a server to handle partial search queries from the client
 *
 * by Nick Collings, LBi
 */


var http = require('http'),
	url = require('url'),
	flo = require('flo').connect();

var requestListener = function (request, response) {
	var rawUrl = url.parse(request.url).pathname.substring(1),
		searchTerm = decodeURIComponent((rawUrl.indexOf("?") !== -1) ? rawUrl.substring(0, rawUrl.indexOf("?")) : rawUrl),
		result = "no result";

	console.log(searchTerm);

	flo.search_term(["name"], searchTerm, 10, function(error, matches) {
		response.writeHead(200);
		response.end("hack("+JSON.stringify(matches)+")");
	});
};

var server = http.createServer(requestListener);

server.listen(8080, "dev.hack");
console.log("Server listening on dev.hack:8080 :D");