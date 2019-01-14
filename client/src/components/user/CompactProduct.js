import React, { Component } from 'react';
import '../../css/user/CompactProduct.css';

import Color from '../universal/Color';

class CompactProduct extends Component {
  render() {
    const { robe } = this.props;

    return (
      <div className="compact-product">
        <img src={robe.images[0]} alt="imagine produs" />
        <p className="robe-title">{robe.title}</p>
        <p className="robe-pattern">{robe.patterns[0]}</p>
        <p className="robe-size">{robe.sizes[0]}</p>
        <div className="robe-color">
          <Color color={robe.colors[0]} size="15px" />
        </div>
        <p className="robe-quantity">x{robe.quantity}</p>
      </div>
    );
  }
}

export default CompactProduct;
