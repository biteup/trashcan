var React = require('react');

var Alert = React.createClass({
	render: function() {
		var alertClass = "alert alert-" + ( this.props.type || "info" ) + " alert-dismiss";
		console.log(this.props.message);
		return (
			<div className={alertClass} role="alert">
  			  	<button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.props.clickFn}><span aria-hidden="true">&times;</span></button>
  				<strong>{this.props.message}</strong>
  			</div>
		);
	}
})

module.exports = Alert;