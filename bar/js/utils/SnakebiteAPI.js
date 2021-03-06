var $ = require('superagent');

var API_URL = 'http://localhost:8000';
var URI = {
	restaurants: 'restaurants',
	tags: 'tags'
}

var preFormatMethod = function(method) {
	method = method.toLowerCase() || 'get';
	if(method === "delete") method = "del";
	return method;
}

SnakebiteAPI = {
	_makeRequest: function(url, method, payload, onSuccess, onFailure) {

		var ajax = $[preFormatMethod(method)];
		var ajaxCall = ajax(url).set('Accept', 'application/json');
		if(payload) ajaxCall.send(payload);
		ajaxCall.end(function(err, resp){
			if(err) {
				onFailure(err);
			}
			else {
				onSuccess(resp);
			}
		});
	},
	getRestaurants: function(onSuccess, onFailure) {
		var url = [API_URL, URI.restaurants].join('/');
		this._makeRequest(url, 'get', null, onSuccess, onFailure);
	},
	deleteRestaurant: function(id, onSuccess, onFailure) {
		var url = [API_URL, URI.restaurants, id].join('/');
		this._makeRequest(url, 'delete', null, onSuccess, onFailure);
	},
	createRestaurant: function(payload, onSuccess, onFailure) {
		var url = [API_URL, URI.restaurants].join('/');
		this._makeRequest(url, 'post', payload, onSuccess, onFailure);
	}
}

module.exports = SnakebiteAPI;