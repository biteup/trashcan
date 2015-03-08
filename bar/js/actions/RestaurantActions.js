var AppDispatcher = require('../dispatchers/AppDispatcher');
var RestaurantConstants = require('../constants/RestaurantConstants');

var RestaurantActions = {

	create: function(payload) {
		AppDispatcher.dispatch({
			actionType: RestaurantConstants.RESTAURANT_CREATE,
			payload: payload
		});
	},
	update: function(id, payload) {
		AppDispatcher.dispatch({
			actionType: RestaurantConstants.RESTAURANT_UPDATE,
			id: id,
			payload: payload
		});
	},
	delete: function(id) {
		AppDispatcher.dispatch({
			actionType: RestaurantConstants.RESTAURANT_DELETE,
			id: id
		})
	},
	deleteSelected: function(ids) {
		if(Array.isArray(ids)) {
			AppDispatcher.dispatch({
				actionType: RestaurantConstants.RESTAURANT_DELETE_SELECTED,
				ids: ids
			});
		}
	},
	loadDataFromServer: function() {
		AppDispatcher.dispatch({
			actionType: RestaurantConstants.RESTAURANTS_LOAD
		});
	},
	loadDataFromServerSuccess: function(payload) {
		AppDispatcher.dispatch({
			actionType: RestaurantConstants.RESTAURANTS_LOAD_SUCCESS,
			payload: payload
		});
	},
	loadDataFromServerFailure: function(error) {
		AppDispatcher.dispatch({
			actionType: RestaurantConstants.RESTAURANTS_LOAD_FAILURE,
			error: error
		});
	},

}

module.exports = RestaurantActions;
