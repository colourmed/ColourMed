import React, { Component } from 'react';
import { ICONS } from '../../constants/Icons';
import '../../css/universal/Success.css';

import Icon from '../universal/Icon';

class Success extends Component {
  render() {
    const { success, removeSuccess } = this.props;

    if (success.message) {
      return (
        <div className="success-container">
          <p className="success">{success.message}</p>
          <button
            onClick={() => {
              removeSuccess();
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

export default Success;
