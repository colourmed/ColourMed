import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ICONS } from '../../constants/Icons';
import '../../css/universal/Header.css';

import Icon from '../universal/Icon';

class Header extends Component {
  render() {
    return (
      <div id="header">
        <NavLink id="page-title" to="/">
          ColourMed Design
        </NavLink>

        <ul id="navigation">
          <NavLink to="/products" activeClassName="active">
            Halate
            <Icon icon={ICONS.MONEY} color="#333" size={24} />
          </NavLink>

          <NavLink to="/contact">
            Contact
            <Icon icon={ICONS.CONTACT} color="#333" size={24} />
          </NavLink>

          <NavLink to="/cart">
            Cart
            <Icon icon={ICONS.CART} color="#333" size={24} />
          </NavLink>
        </ul>
      </div>
    );
  }
}

export default Header;
