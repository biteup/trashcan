var $ = require('superagent');

var API_URL = 'https://snakebite.herokuapp.com';

SnakebiteAPI = {
	getRestaurants: function(callback) {
		$.get(API_URL + '/restaurants')
		.set('Accept', 'application/json')
		.end(function(err, resp){
			if(err) return;
			console.log(resp.body);
			resp.body.items.forEach(function(r, i, arr){
				r.id = r._id['$oid'];
			});
			callback(resp.body);
		});
	} 
}

module.exports = SnakebiteAPI;