var React = require('react');
var RestaurantStore = require('../stores/RestaurantStore');
var RestaurantList = require('./RestaurantList.react');
var RestaurantForm = require('./RestaurantForm.react');

function getRestaurantState() {
	return {
		restaurants: RestaurantStore.getDataFromServer()
	};
}

var CMSApp = React.createClass({
	getInitialState: function() {
		return getRestaurantState();
	},
	componentDidMount: function() {
    	RestaurantStore.addChangeListener(this._onChange);
  	},
  	componentWillUnmount: function() {
    	RestaurantStore.removeChangeListener(this._onChange);
  	},
  	render: function() {
  		return (
  			<div>
  			  <h1>Restaurants</h1>
  			  <RestaurantList restaurants={this.state.restaurants} />
  			  <hr />
  			  <RestaurantForm text="Add" />
  			</div>
  		)
  	},
  	_onChange: function() {
      this.setState(getRestaurantState())
    }
});

module.exports = CMSApp;
