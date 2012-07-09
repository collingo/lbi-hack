// create redis client
var redisClient = require('redis').createClient();

// tries will be stored under the "trie:" prefix.
var prefix = "trie:";

// load Autocomplete, pass along redisClient and prefix.
var Autocomplete = require('./Autocomplete')(redisClient,prefix);

// load LBi people JSON
var people = require('./team-no-photo').people;
// var people = require('./j/team.js').people;

var index = people.length - 1;

console.log(people.length, people[0].name);

function complete() {
	console.log("complete");

	// suggest words that start with "wo", limit to 2 responses.
	Autocomplete.suggest("Ca", 10, function(words) {
	  // log
	  console.log(words);
	  // exits.
	  process.exit(0);
	});


	// var fs = require('fs');
	// fs.writeFile("./team-no-photo.js", JSON.stringify(people), function(err) {
	//     if(err) {
	//         console.log(err);
	//     } else {
	//         console.log("The file was saved!");
	//     }
	// });


	//process.exit(0);
}

function add() {
	var person = people[index],
		first, last;

	// if(people[index].hasOwnProperty("thumbnail")) {
	// 	console.log("has thumbnail");
	// 	delete people[index].thumbnail;
	// }
	if(person.hasOwnProperty("name")) {
		// first = person.name.split(" ")[0];
		// last = person.name.split(" ")[1];
	
		// Autocomplete.add(first, function() {
		// 	console.log("Added: " + first);
		// 	Autocomplete.add(last, function() {
		// 		console.log("Added: " + last);
		// 		if(index === 0) {
		// 			complete();
		// 		} else {
		// 			index--;
		// 			add();
		// 		}
		// 	});
		// });
		

		Autocomplete.add(person.name, function() {
			console.log("Added: " + person.name);
			if(index === 0) {
				complete();
			} else {
				index--;
				add();
			}
		});
	}
}

add();
// complete();