import React, { Component } from 'react';
import '../../css/universal/FullRobe.css';

import Color from '../universal/Color';
import GenderLabel from '../universal/GenderLabel';

class FullRobe extends Component {
  render() {
    const { robe, history } = this.props;

    const robeColors = robe.colors.map(color => (
      <Color color={color} key={color} />
    ));

    return (
      <div className="full-robe-card" key={robe._id}>
        <div className="left-side">
          <img src={robe.images[0]} alt={robe.title} />
          <div className="robe-colors">{robeColors}</div>
          <GenderLabel forMen={robe.forMen} />
        </div>

        <div className="right-side">
          <h2 className="robe-title">{robe.title}</h2>
          <h3 className="robe-price">{robe.price} RON</h3>
          <p>{robe.description}</p>
          <h4 className="robe-sizes">Marimi: {robe.sizes.join(', ')}</h4>
          <button
            onClick={() => {
              history.push(`/products/${robe._id}`);
            }}>
            Vezi Produsul
          </button>
        </div>
      </div>
    );
  }
}

FullRobe.defaultProps = {
  robe: {
    colors: [],
    images: [],
    sizes: []
  }
};

export default FullRobe;
