var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var RestaurantConstants = require('../constants/RestaurantConstants');
var RestaurantActions = require('../actions/RestaurantActions');
var assign = require('object-assign');
var SnakebiteAPI = require('../utils/SnakebiteAPI');

var sampleRestaurant = require('../sampleRestaurant.json');

var CHANGE_EVENT = 'change';

var _restaurants = {};
var _loading = false;
var _error;

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

function updateRestaurantsFromServer(data){
	data.items.forEach(function(r, index, arr){
		_restaurants[r._id["$oid"]] = r;
	});
}

function updateDeletedRestaurantFromServer(data){
}


var RestaurantStore = assign({}, EventEmitter.prototype, {

	getCurrent: function(){
		if(Object.keys(_restaurants).length < 1 && !_loading) {
			// make load request action
			RestaurantActions.loadDataFromServer();
			_loading = true;
			this.emitChange();
		};
		return {
			restaurants : _restaurants,
			error : _error,
			loading: _loading
		}
	},
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	}

});

AppDispatcher.register(function(action) {

	switch(action.actionType) {
		case RestaurantConstants.RESTAURANT_CREATE:
			console.log('CREATE RESTAURANT action received');
			if(action.payload){
				SnakebiteAPI.createRestaurant(action.payload, function(resp){
					console.log(resp);
					if(!resp.error){
						_error = null;
					}
					else {
						_error = resp.body;
					};
					_loading = false;
					RestaurantStore.emitChange();
				},
				function(err){
					_error = err;
					_loading = false;
					RestaurantStore.emitChange();
				});
			};
			break;
		case RestaurantConstants.RESTAURANT_DELETE:
			console.log('DELETE RESTAURANT action received');
			SnakebiteAPI.deleteRestaurant(action.id, function(resp){
				_error = null;
				_loading = false;
				//RestaurantActions.loadDataFromServerSuccess({id: action.id});
				RestaurantStore.emitChange();
			},
			function(err){
				_error = err;
				_loading = false;
				//RestaurantActions.loadDataFromServerFailure(err);
				RestaurantStore.emitChange();
			});
			break;
		case RestaurantConstants.RESTAURANT_DELETE_SELECTED:
			console.log('DELETE SELECTED RESTAURANT action received');
			removeSelected(action.ids);
			RestaurantStore.emitChange();
			break;
		case RestaurantConstants.RESTAURANT_UPDATE:
			console.log('UPDATE RESTAURANT action received');
			update(action.id, action.payload);
			RestaurantStore.emitChange();
			break;
		case RestaurantConstants.RESTAURANTS_LOAD:
			console.log('LOAD RESTAURANTS action received');
			SnakebiteAPI.getRestaurants(function(resp){
				_error = null;
				_loading = false;
				RestaurantActions.loadDataFromServerSuccess(resp.body);
			},
			function(err){
				_error = err;
				_loading = false;
				RestaurantActions.loadDataFromServerFailure(err);
			})
			break;
		case RestaurantConstants.RESTAURANTS_LOAD_SUCCESS:
			console.log('LOAD RESTAURANTS SUCCESS action received');
			updateRestaurantsFromServer(action.payload);
			RestaurantStore.emitChange();
			break;
		case RestaurantConstants.RESTAURANTS_LOAD_FAILURE:
			console.log('LOAD RESTAURANTS FAILURE action received');
			RestaurantStore.emitChange();
			break;
		default:
			// noop
	}
});

module.exports = RestaurantStore;