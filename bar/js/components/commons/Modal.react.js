var React = require('react');

var modalContentStyle = {
	zIndex: 'inherit'
};

var Modal = React.createClass({
	_onClick: function(e){
		this.props.clickFn(e);
		$('#mainModal').modal('hide');
	},

	render: function() {
		return (
			<div className="modal fade" id="mainModal" tabIndex="-1" role="dialog" aria-labelledby="mainModalLabel" aria-hidden="true">
			  <div className="modal-dialog" style={modalContentStyle}>
			    <div className="modal-content">
			      <div className="modal-header">
			        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			        <h4 className="modal-title" id="mainModalLabel">{this.props.title}</h4>
			      </div>
			      <div className="modal-body">
			        {this.props.body}
			      </div>
			      <div className="modal-footer">
			        <button type="button" id="modalBtnCancel" className="btn btn-warning" data-dismiss="modal">Close</button>
			        <button type="button" id="modalBtnConfirm" className="btn btn-success" onClick={this._onClick}>{this.props.confirmText}</button>
			      </div>
			    </div>
			  </div>
			</div>
		)
	}
})

module.exports = Modal;