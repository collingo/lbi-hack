var LDAP = require('LDAP');
var ldap = new LDAP({ uri: 'ldap://ukdc5v.lbi.local', version: 3});

ldap.open(function(err) {
    if (err) throw new Error('Can not connect');
    // connection is ready.
    
    console.log("connected!");
    // console.log(ldap);

	// ldap.simpleBind({
	// 	binddn: 'CN=Nick Collings,OU=Users,OU=LBi UK,OU=UK,DC=lbi,DC=local',
	// 	password: 'Password1'
	// }, function(err) {
	// 	if (err) throw new Error('Can not bind');
	// 	console.log("simplebound!");

	// 	ldap.search({
	// 		base: 'DC=lbi,DC=local',
	// 		scope: 2,
	// 		filter: 'sn=Ryan',
	// 		attrs: 'thumbnailPhoto'
	// 	}, function(err, data) {
	// 		if (err) {
	// 			console.log(err);
	// 			throw new Error('Can not search');
	// 		}

	// 		if(data) console.log("auth", data);
	// 	});
	// });

	ldap.findandbind({
		base: 'DC=lbi,DC=local',
		scope: 2,
		filter: 'sn=Ryan',
		attrs: 'thumbnailPhoto',
		password: "Password1"
	}, function(err, data) {
		if (err) {
			console.log(err);
			throw new Error('Can not search');
		}

		if(data) console.log("findnbind", data);
	});

	// ldap.search({
	// 	base: 'DC=lbi,DC=local',
	// 	scope: 2,
	// 	filter: 'sn=Ryan',
	// 	attrs: 'thumbnailPhoto'
	// }, function(err, data) {
	// 	// if (err) {
	// 	// 	console.log(err);
	// 	// 	throw new Error('Can not search');
	// 	// }

	// 	if(data) console.log("noauth", data);
	// });
});
