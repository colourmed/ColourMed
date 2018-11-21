import React, { Component } from 'react';
import { ICONS } from '../../constants/Icons';
import '../../css/universal/RobeCard.css';

import Color from '../universal/Color';
import Icon from '../universal/Icon';

class RobeCard extends Component {
  render() {
    const {
      robe,
      handleCardClick,
      showEditRobeOverlay,
      showRemoveRobeOverlay,
      showRemoveFromCartOverlay,
      showAddRobeOverlay,
      showAdminControls,
      showUserControls,
      showCartControls
    } = this.props;

    const robeColors = robe.colors.map(color => (
      <Color color={color} key={color} />
    ));

    return (
      <div
        onClick={() => handleCardClick(robe._id)}
        className="robe-card"
        key={robe._id}>
        <img src={robe.images[0]} alt={robe.title} />
        <h3 className="robe-title">{robe.title}</h3>
        <div className="robe-colors">{robeColors}</div>
        <h4 className="robe-price">{robe.price} RON</h4>

        {showAdminControls ? (
          <div className="admin-controls">
            <button onClick={e => showEditRobeOverlay(e, robe._id)}>
              <Icon icon={ICONS.EDIT} color="#777" size={24} />
            </button>
            <button onClick={e => showRemoveRobeOverlay(e, robe._id)}>
              <Icon icon={ICONS.REMOVE} color="#c92e2e" size={24} />
            </button>
          </div>
        ) : null}

        {showUserControls ? (
          <button
            className="add-to-cart-btn"
            onClick={e => showAddRobeOverlay(e, robe)}>
            Adaugă in coș
          </button>
        ) : null}

        {showCartControls ? (
          <button
            className="remove-from-cart-btn"
            onClick={e => showRemoveFromCartOverlay(e, robe)}>
            <Icon icon={ICONS.CROSS} color="#333" size={24} />
          </button>
        ) : null}

        {robe.quantity ? (
          <div className="item-count">Bucăți: {robe.quantity}</div>
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
  showAdminControls: false,
  showUserControls: false,
  showCartControls: false
};

export default RobeCard;
