var React = require('react');
var RestaurantActions = require('../actions/RestaurantActions');
var Modal = require('./commons/Modal.react');

var RestaurantForm = React.createClass({
	getInitialState: function () {
		return {
			editing: false,
			sent: false,
			loading: false
		}
	},
	_showCreateForm: function() {
		this.setState({editing: true, sent: false});
	},
	_sendCreateForm: function(e) {
		e.stopPropagation();  // stop form from being sent (as of default form action)
		this.setState({editing: false, sent: true, loading: false});

		var dctArrays = $("#addNewRestaurant").serializeArray();
		var payload = {};
		dctArrays.forEach(function(kv, index, arr){
			payload[kv.name] = kv.value;
		});
		try {
			payload = this._cleanPayload(payload);
			RestaurantActions.create(payload);
		}
		catch(e) {
			alert('Error processing input!');
			return;
		};
	},
	_cleanPayload: function(payload){
		if(!!payload.geolocation){
			// expecting user input with latitude, longitude order
			var latlon = payload.geolocation.split(",");
			payload.geolocation = {lon: parseFloat(latlon[1]), lat: parseFloat(latlon[0])};
		}
		else {
			delete payload.geolocation;
		}
		if(!!payload.tags){
			payload.tags = payload.tags.split(",");
		}
		else {
			payload.tags = [];
		}
		return payload;

	},
	_createForm: function() {
		return (
			<form id="addNewRestaurant" action="#">
			    <div className="form-group">
					<label>Name</label>
					<input type="text" className="form-control" name="name" placeholder="restaurant name" required />
				</div>
				<div className="form-group">
					<label>Description</label>
					<input type="text" className="form-control" name="description" placeholder="restaurant description" required />
				</div>
				<div className="form-group">
					<label>Email</label>
					<input type="email" className="form-control" name="email" placeholder="restaurant email" required />
				</div>
				<div className="form-group">
					<label>Address</label>
					<input type="text" className="form-control" name="address" placeholder="restaurant address" required />
				</div>
				<div className="form-group">
					<label>Geolocation</label>
					<input type='text' className="form-control" name='geolocation' placeholder="example format: 35.6604935,139.7300985]" />
				</div>
				<div className="form-group">
					<label>Tags</label>
					<input type="text" className="form-control" name="tags" placeholder="restaurant tags" required />
				</div>
			</form>
		)
	},
	render: function () {
		var createForm = this.state.editing? this._createForm() : null;
		return (
			<div>
				<button className="btn btn-primary" data-target="#mainModal" data-toggle="modal" data-backdrop="static" onClick={this._showCreateForm}>Add New</button>
				<Modal title="Add New Restaurant" body={createForm} clickFn={this._sendCreateForm} confirmText="Save" />
			</div>
		)
	}
});

module.exports = RestaurantForm;
