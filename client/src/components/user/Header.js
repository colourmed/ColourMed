import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCartItems } from '../../store/actions/cart';
import { fetchRobes } from '../../store/actions/robes';
import { ICONS } from '../../constants/Icons';
import '../../css/universal/Header.css';

import Icon from '../universal/Icon';

class Header extends Component {
  componentDidMount() {
    this.props.fetchRobes().then(() => {
      this.props.fetchCartItems();
    });
  }

  render() {
    const { cart } = this.props;

    return (
      <div id='header'>
        <Link id='page-title' to='/'>
          ColourMed Design
        </Link>

        <ul id='navigation'>
          <Link to='/products'>
            Halate
            <Icon icon={ICONS.MONEY} color='#333' size={24} />
          </Link>

          <Link to='/contact'>
            Contact
            <Icon icon={ICONS.CONTACT} color='#333' size={24} />
          </Link>

          <Link to='/cart'>
            Coș
            <Icon icon={ICONS.CART} color='#333' size={24} />
            {cart.length ? <div className='cart-items-number'>{cart.length}</div> : null}
          </Link>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { cart: state.cart };
}

export default connect(
  mapStateToProps,
  { fetchCartItems, fetchRobes }
)(Header);
