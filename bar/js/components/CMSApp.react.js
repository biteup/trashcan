var React = require('react');
var RestaurantStore = require('../stores/RestaurantStore');
var RestaurantList = require('./RestaurantList.react');
var RestaurantForm = require('./RestaurantForm.react');

function getRestaurantState() {
  return RestaurantStore.getCurrent();
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
          {this.state.error ? <small>Error loading data</small> : null}
          {this.state.loading ? <small>Loading data...</small> : null}
  			  <RestaurantList restaurants={this.state.restaurants} />
  			  <hr />
  			  <RestaurantForm text="Add" />
  			</div>
  		)
  	},
  	_onChange: function() {
      var state = getRestaurantState();
      console.log('STATE', state);
      this.setState(state);
    }
});

module.exports = CMSApp;
