import React, { Component } from 'react';
import '../../css/universal/GenderLabel.css';

class GenderLabel extends Component {
  render() {
    const { forMen } = this.props;
    const labelClassName = forMen ? 'male' : 'female';

    return <div className={`gender-label ${labelClassName}`}>{forMen ? 'BĂRBATI': 'FEMEI'}</div>;
  }
}

GenderLabel.defaultProps = {
  forMen: false
};

export default GenderLabel;
