/**
 * 
 */

import React from 'react';

import { Alert } from 'reactstrap';

class AlertMessage extends React.Component {
  constructor(props) {
    super(props);

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.props.onAlertDismiss();
  }

  render() {

    return (
      <div className="alert-message">
        <Alert color={this.props.params.color} isOpen={this.props.params.visible} toggle={this.onDismiss}>
          {this.props.params.message}
        </Alert>
      </div>
    );
  }
}

export default AlertMessage;
