/**
 * ==========================
 *   LBi Hack Sessions 2012
 *         Team Who?
 * ==========================
 * 
 * Syncing Module
 * -------------
 * Syncs LDAP data into local database for faster referencing and conversion of datauri's to files
 *
 * by Nick Collings, LBi
 */

var http = require('http'),
	url = require('url'),
	ldap = require('ldapjs'),
	assert = require('assert'),
	client = ldap.createClient({
		url: 'ldap://ukdc5v.LBi.local'
	}),
	bound = false;

if(bound === false) {
	client.bind('CN=Nick Collings,OU=Users,OU=LBi UK,OU=UK,DC=lbi,DC=local', 'Password1', function(err, res) {
		assert.ifError(err);

		bound = true;
	});
}

client.search('OU=Users,OU=LBi UK,OU=UK,DC=lbi,DC=local', {
	filter: "sn=Collings",
	attributes: ['givenName', 'sn', 'title', 'department', 'manager', 'telephoneNumber', 'mail', 'extensionAttribute1', 'l'],
	scope: 'sub'
}, function(err, res) {
	assert.ifError(err);

	var count = 0;

	res.on('searchEntry', function(entry) {
		console.log(entry.object);
		console.log(Object.keys(entry.object).length);
		count++;
		// console.log(entry.object.sn);
		// console.log('entry: ' + JSON.stringify(entry.object).substring(0,100));
		//console.log(entry.object.thumbnailPhoto);

		// client.unbind(function(err) {
		// 	assert.ifError(err);
		// 	bound = false;
		// });
	});
	// res.on('searchReference', function(referral) {
	// 	console.log('referral: ' + referral.uris.join());
	// });
	res.on('error', function(err) {
		console.error('error: ' + err.message);
	});
	res.on('end', function(result) {
		console.log('status: ' + result.status);
		console.log('count = '+count);
		process.exit(0);
	});
});