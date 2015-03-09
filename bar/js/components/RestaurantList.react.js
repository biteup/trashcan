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
			var maps_url = "http://maps.google.com/maps?q=loc:" + r.geolocation.lat + ',' + r.geolocation.lon;
			items.push(
				<tr key={r.id}>
					<td>{r.name}</td>
					<td>{r.email}</td>
					<td><a href={maps_url} target="_blank">{r.address}</a></td>
					<td>{r.tags}</td>
					<td>{r.menus.length}</td>
					<td>
						<button className="btn btn-warning" onClick={this._onClickDelete.bind(this, item)}>del</button>
						<button className="btn btn-primary">edit</button>
					</td>
				</tr>
			);
		};
		return (
			<table className="table table-hover">
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Address</th>
						<th>Tags</th>
						<th>Menu Size</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{items}
				</tbody>
			</table>
		)
	},
	_onClickDelete: function(id) {
		if(confirm('Delete Restaurant #' + id + '?')){
		RestaurantActions.delete(id);
		}
	}
});

module.exports = RestaurantList;
