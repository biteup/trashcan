var React = require('react');
var RestaurantActions = require('../actions/RestaurantActions');

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
	_sendForm: function(e) {
		e.preventDefault();  // stop form from being sent (as of default form action)
		this.setState({editing: false, sent: true, loading: false});
		RestaurantActions.create({});
	},
	_createForm: function() {
		return (
			<form action="#" onSubmit={this._sendForm}>
				<label>Name</label>
				<input type="text" name="name" placeholder="restaurant name" required />
				<label>Description</label>
				<input type="text" name="description" placeholder="restaurant description" required />
				<label>Email</label>
				<input type="email" name="email" placeholder="restaurant email" required />
				<label>Address</label>
				<input type="text" name="address" placeholder="restaurant address" required />
				<label>Geolocation</label>
				<input type='text' name='geolocation' placeholder="example format: 35.6604935,139.7300985]" />
				<label>Tags</label>
				<input type="text" name="tags" placeholder="restaurant tags" required />
				<button type="submit">Create</button>
			</form>
		)
	},
	render: function () {
		var createForm = this.state.editing? this._createForm() : null;
		return (
			<div>
				<button onClick={this._showCreateForm}>Create Restaurant</button>
				{createForm}
			</div>
		)
	}
});

module.exports = RestaurantForm;
