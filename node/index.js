/**
 * ==========================
 *   LBi Hack Sessions 2012
 *         Team Who?
 * ==========================
 * 
 * Indexer Module
 * -------------
 * Builds an index to assist fast, partial autocompleted searches
 *
 * by Nick Collings, LBi
 */


var // flo is a nodejs implementation of Soulmate by SeatGeek
	flo = require('flo').connect();

/**
 * Builds an index for a given metric based on a given json data source
 * @param {array} source json array of data objects
 * @param {string} metric data metric to be indexed
 */
function Indexer(source, metric) {
	if(!source || typeof source !== "object" || !source.length || !metric || typeof metric !== "string") { return; }

	// json data source
	this.source = source;
	this.metric = metric;
	this.counter = 0;
}
Indexer.prototype = {

	id: "Index",

	/**
	 * Trigger a new build
	 * @return {null}
	 */
	build: function() {

		// reset counter
		this.counter = this.source.length - 1;

		// start indexing
		this.add.call(this);
	},

	/**
	 * Adds current item to the index
	 */
	add: function() {
		var item = this.source[this.counter];

		// check metric exists on item
		if(item.hasOwnProperty(this.metric)) {

			// add item to index
			flo.add_term(this.metric, this.counter, item[this.metric], 0, item, this.added.bind(this));
		}
	},

	/**
	 * Added item callback
	 * @return {null}
	 */
	added: function() {
		this.log("Added " + this.source[this.counter][this.metric]);

		if(this.counter === 0) {
			this.complete.call(this);
		} else {
			this.counter--;
			this.add.call(this);
		}
	},

	/**
	 * Build complete callback
	 * @return {null}
	 */
	complete: function() {
		this.log("Indexing built");

		process.exit(0);
	},

	/// utility
	
	/**
	 * Overrides local log calls to prepend identifier
	 * @return {null}
	 */
	log: function() {
        var prefix = this.id + ":";
        var items = Array.prototype.slice.call(arguments, 0);
        items.unshift(prefix);
        console.log.apply(console, items);
	}

};

// load LBi people JSON
var people = require('../assets/team-no-photo').people;

var indexer = new Indexer(people, "name");

indexer.build();