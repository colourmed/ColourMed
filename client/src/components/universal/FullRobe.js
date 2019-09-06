import React, { Component } from 'react';
import '../../css/universal/FullRobe.css';

import Color from '../universal/Color';
import GenderLabel from '../universal/GenderLabel';

class FullRobe extends Component {
  truncateDescription(description) {
    const MAX_CHAR_COUNT = 175;

    let truncatedDescription = '';

    for (let i = 0; i < description.length; i++) {
      if (i > MAX_CHAR_COUNT) {
        truncatedDescription += '...';
        break;
      } else {
        truncatedDescription += description[i];
      }
    }

    return truncatedDescription;
  }

  render() {
    const { robe, history } = this.props;

    const robeColors = robe.colors.map(color => (
      <Color color={color} key={color} />
    ));

    const robeDescription = this.truncateDescription(robe.description);

    return (
      <div className='full-robe-card' key={robe._id}>
        <div className='left-side'>
          <img src={robe.images[0]} alt={robe.title} />
          <div className='robe-colors'>{robeColors}</div>
          <GenderLabel forMen={robe.forMen} />
        </div>

        <div className='right-side'>
          <h2 className='robe-title'>{robe.title}</h2>
          <h3 className='robe-price'>{robe.price} RON</h3>
          <p className='robe-description'>{robeDescription}</p>
          <h4 className='robe-sizes'>Mărimi: {robe.sizes.join(', ')}</h4>
          <button
            className='check-product-btn'
            onClick={() => {
              history.push(`/${robe._id}`);
            }}
          >
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
