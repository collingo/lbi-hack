var ldap = require('ldapjs');
var assert = require('assert');
var client = ldap.createClient({
  url: 'ldap://ukdc5v.LBi.local'
});
console.log("attempting bind");
client.bind('CN=Nick Collings,OU=Users,OU=LBi UK,OU=UK,DC=lbi,DC=local', 'Password1', function(err, res) {
  assert.ifError(err);
  //console.log(res);
});

client.search('OU=Users,OU=LBi UK,OU=UK,DC=lbi,DC=local', {
    filter: "sn=huntington",
    scope: 'sub'
  }, function(err, res) {
	assert.ifError(err);

	res.on('searchEntry', function(entry) {
		console.log(Object.keys(entry.object));
		console.log(entry.object.sn);
		console.log('entry: ' + JSON.stringify(entry.object).substring(0,100));
	});
	// res.on('searchReference', function(referral) {
	// 	console.log('referral: ' + referral.uris.join());
	// });
	res.on('error', function(err) {
		console.error('error: ' + err.message);
	});
	// res.on('end', function(result) {
	// 	console.log('status: ' + result.status);
	// });
});