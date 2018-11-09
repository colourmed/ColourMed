import React, { Component } from 'react';
import '../../css/universal/Error.css';

class Error extends Component {
  render() {
    const { error } = this.props;

    if (error.message) {
      return (
        <div className="error-container">
          <p className="error">{error.message}</p>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Error;