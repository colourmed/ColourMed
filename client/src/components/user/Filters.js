import React, { Component } from 'react';
import { PRODUCT_TYPES } from '../../constants/ProductTypes';
import '../../css/user/Filters.css';

class Filters extends Component {
  render() {
    const { productsType, changeProductType } = this.props;

    const genderOptions = Object.values(PRODUCT_TYPES).map(gender => {
      let style = {};

      // If gender is selected
      if (gender === productsType) {
        switch (gender) {
          case PRODUCT_TYPES.MEN:
            style.backgroundColor = 'dodgerblue';
            style.color = '#f5f5f5';
            style.fontWeight = 'bold';
            break;
          case PRODUCT_TYPES.WOMEN:
            style.backgroundColor = '#DA3F3F';
            style.color = '#f5f5f5';
            style.fontWeight = 'bold';
            break;
          default:
            style.backgroundColor = '#333';
            style.color = '#f5f5f5';
            style.fontWeight = 'bold';
        }
      }

      return (
        <div
          className='gender'
          key={gender}
          style={style}
          onClick={() => changeProductType(gender)}
        >
          <span>{gender}</span>
        </div>
      );
    });

    return <div id='filters'>{genderOptions}</div>;
  }
}

export default Filters;
