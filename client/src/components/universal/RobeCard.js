import React, { Component } from 'react';
import { ICONS } from '../../constants/Icons';
import '../../css/universal/RobeCard.css';

import Color from '../universal/Color';
import Icon from '../universal/Icon';

class RobeCard extends Component {
  render() {
    const {
      robe,
      colorSize,
      handleCardClick,
      addRobeToFeatured,
      showEditRobeOverlay,
      showRemoveRobeOverlay,
      showRemoveFromCartOverlay,
      showAddRobeOverlay,
      showAdminControls,
      showUserControls,
      showCartControls,
      showFeaturedControls
    } = this.props;

    const robeColors = robe.colors.map(color => <Color color={color} key={color} size={colorSize} />);

    return (
      <div onClick={() => handleCardClick(robe._id)} className='robe-card' key={robe._id}>
        <img src={robe.images[0]} alt={robe.title} />
        <h3 className='robe-title'>{robe.title}</h3>
        <div className='robe-colors'>{robeColors}</div>
        <h4 className='robe-price'>{robe.price} RON</h4>

        {showAdminControls ? (
          <div className='admin-controls'>
            <div className='controls-left'>
              <button title='Adauga la Produse Recomandate.' onClick={e => addRobeToFeatured(e, robe._id)}>
                <Icon icon={ICONS.NEW} color='#444' size={24} />
              </button>
            </div>

            <div className='controls-right'>
              <button title='Editeaza Produsul.' onClick={e => showEditRobeOverlay(e, robe._id)}>
                <Icon icon={ICONS.EDIT} color='#777' size={24} />
              </button>
              <button title='Sterge Produsul.' onClick={e => showRemoveRobeOverlay(e, robe._id)}>
                <Icon icon={ICONS.REMOVE} color='#c92e2e' size={24} />
              </button>
            </div>
          </div>
        ) : null}

        {showUserControls ? (
          <button className='add-to-cart-btn' onClick={e => showAddRobeOverlay(e, robe)}>
            Adaugă in coș
          </button>
        ) : null}

        {showCartControls ? (
          <button className='remove-from-cart-btn' onClick={e => showRemoveFromCartOverlay(e, robe)}>
            <Icon icon={ICONS.CROSS} color='#eee' size={24} />
          </button>
        ) : null}

        {showFeaturedControls ? (
          <button
            className='remove-from-featured-btn'
            title='Elimina din recomandate'
            onClick={() => this.props.removeFromFeatured(robe._id)}>
            <Icon icon={ICONS.CROSS} color='#c51e1e' size={24} />
          </button>
        ) : null}

        {robe.quantity ? (
          <div className='order-details'>
            <div className='item-count'>
              Cantitate: <span className='bold'>{robe.quantity}</span>
            </div>
            <div className='item-size'>
              Mărime: <span className='bold'>{robe.sizes[0].trim()}</span>
            </div>
            {robe.patterns[0] ? (
              <div className='item-pattern'>
                Model: <span className='bold'>{robe.patterns[0]}</span>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

RobeCard.defaultProps = {
  robe: {
    colors: [],
    images: []
  },
  colorSize: '10px',
  showAdminControls: false,
  showUserControls: false,
  showCartControls: false,
  showFeaturedControls: false,
  handleCardClick: () => {}
};

export default RobeCard;
