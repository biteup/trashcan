var React = require('react');
var RestaurantActions = require('../actions/RestaurantActions');

var RestaurantForm = React.createClass({
	getInitialState: function () {
		return {
		}
	},
	_onClick: function() {
		RestaurantActions.create({});
	},
	render: function () {
		return (
			<button onClick={this._onClick}>{this.props.text}</button>
		)
	}
});

module.exports = RestaurantForm;
