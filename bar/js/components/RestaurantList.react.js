var React = require('react');
var RestaurantActions = require('../actions/RestaurantActions');

var RestaurantList = React.createClass({
	getInitialState: function() {
		return {
			restaurants: this.props.restaurants
		}
	},
	render: function() {
		var items = [];
		for(var item in this.state.restaurants) {
			var r = this.state.restaurants[item];
			items.push(
				<li>{r.name} | {r.address} | <button onClick={this._onClickDelete.bind(this, item)}>del</button></li>
			);
		};
		return (
			<ul>
			{items}
			</ul>
		)
	},
	_onClickDelete: function(id) {
		alert('hello, ' + id);
	}
});

module.exports = RestaurantList;
