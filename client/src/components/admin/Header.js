import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ICONS } from '../../constants/Icons';
import '../../css/universal/Header.css';

import Icon from '../universal/Icon';

class Header extends Component {
  render() {
    return (
      <div id="header">
        <NavLink id="page-title" to="/admin">
          Admin Console
        </NavLink>

        <ul id="navigation">
          <Link to="/">
            ColourMed
            <Icon icon={ICONS.WEB} color="#333" size={24} />
          </Link>

          <NavLink to="/admin/products" activeClassName="active">
            Halate
            <Icon icon={ICONS.MONEY} color="#333" size={24} />
          </NavLink>

          <NavLink to="/admin/new">
            Produs Nou
            <Icon icon={ICONS.NEW} color="#333" size={24} />
          </NavLink>
        </ul>
      </div>
    );
  }
}

export default Header;
