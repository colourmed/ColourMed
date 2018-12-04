import React, { Component } from 'react';
import { ICONS } from '../../constants/Icons';
import '../../css/universal/Error.css';

import Icon from '../universal/Icon';

class Error extends Component {
  render() {
    const { error, removeError } = this.props;

    if (error.message) {
      return (
        <div className="error-container">
          <p className="error">{error.message}</p>
          <button
            onClick={() => {
              removeError();
            }}>
            <Icon icon={ICONS.CROSS} size={24} />
          </button>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Error;
