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
				<button className="btn btn-success" type="submit">Create</button>
			</form>
		)
	},
	render: function () {
		var createForm = this.state.editing? this._createForm() : null;
		return (
			<div>
				<button className="btn btn-primary" onClick={this._showCreateForm}>Create Restaurant</button>
				{createForm}
			</div>
		)
	}
});

module.exports = RestaurantForm;
