$(function() {

	var request,
		search = $("#search"),
		result = $("#result");

	function send(text) {
		result.text("");
		if(request !== undefined) {
			console.log("aborting");
			request.abort();
		}
		request = $.ajax({
			url: "http://dev.hack:8080/"+text,
			dataType: "jsonp",
			jsonpCallback: "hack",
			success: function(data, textStatus, jqXHR) {
				console.log(data);
				if(data.name.length) {
					_.each(data.name, function(match) {
						if(result.text().length) { result.text(result.text() + ", "); }
						result.text(result.text() + JSON.parse(match).data.name);
					});
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("NO! "+errorThrown);
			}
		});
	}

	search.keyup(function(e) {
		if(this.value.length) {
			send(this.value);
		}
	});
});