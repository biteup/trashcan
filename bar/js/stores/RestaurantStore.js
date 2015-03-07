var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var RestaurantConstants = require('../constants/RestaurantConstants');
var assign = require('object-assign');
var SnakebiteAPI = require('../utils/SnakebiteAPI');

var sampleRestaurant = require('../sampleRestaurant.json');

var CHANGE_EVENT = 'change';

var _restaurants = {};

function create(data) {
	// make call to Snakebite API via util
	var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
	_restaurants[id] = sampleRestaurant;
}

function update(id, payload) {
	_restaurants[id] = assign({}, _restaurants[id], payload);
	// send api call with updated payload
}

function remove(id) {
	delete _restaurants[id];
	// make call to delete restaurant from Snakebite
}

function removeSelected(ids) {
	ids.forEach(function(id, index, arr){
		if(_restaurants[id]){
			remove(id);
		}
	});
}

function loadDataFromServer(data){
	_restaurants = {};
	data.items.forEach(function(r, index, arr){
		_restaurants[r.id] = r;
	});
	console.log(_restaurants);
}


var RestaurantStore = assign({}, EventEmitter.prototype, {

	getAll: function(){
		return _restaurants;
	},
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},
	getDataFromServer: function(){
		if(Object.keys(_restaurants).length < 1){
			SnakebiteAPI.getRestaurants(this.updateFromServer);
		}
		else {
			return _restaurants;
		}
	},
	updateFromServer: function(data){
		AppDispatcher.dispatch({
      		actionType: RestaurantConstants.RESTAURANT_GET_DATA_FROM_SERVER,
      		payload: data
    	});
    	return _restaurants;
	}

});

AppDispatcher.register(function(action) {

	switch(action.actionType) {
		case RestaurantConstants.RESTAURANT_CREATE:
			if(action.payload){
				create(action.payload)
			};
			RestaurantStore.emitChange();
			break;
		case RestaurantConstants.RESTAURANT_DELETE:
			remove(action.id);
			RestaurantStore.emitChange();
			break;
		case RestaurantConstants.RESTAURANT_DELETE_SELECTED:
			removeSelected(action.ids);
			RestaurantStore.emitChange();
			break;
		case RestaurantConstants.RESTAURANT_UPDATE:
			update(action.id, action.payload)
			RestaurantStore.emitChange();
			break;
		case RestaurantConstants.RESTAURANT_GET_DATA_FROM_SERVER:
			loadDataFromServer(action.payload);
			RestaurantStore.emitChange();
		default:
			// noop
	}
});

module.exports = RestaurantStore;