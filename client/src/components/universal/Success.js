import React, { Component } from 'react';
import '../../css/universal/Success.css';

class Success extends Component {
  render() {
    const { success } = this.props;

    if (success.message) {
      return (
        <div className="success-container">
          <p className="success">{success.message}</p>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Success;