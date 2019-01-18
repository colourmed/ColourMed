import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ICONS } from '../../constants/Icons';
import '../../css/universal/Header.css';

import Icon from '../universal/Icon';

class Header extends Component {
  render() {
    return (
      <div id="header">
        <Link id="page-title" to="/admin">
          Consola Admini
        </Link>

        <ul id="navigation">
          <Link to="/admin">
            Halate
            <Icon icon={ICONS.MONEY} color="#333" size={24} />
          </Link>

          <Link to="/admin/featured">
            Recomandate
            <Icon icon={ICONS.FEATURES} color="#333" size={24} />
          </Link>

          <Link to="/admin/new">
            Produs Nou
            <Icon icon={ICONS.NEW} color="#333" size={24} />
          </Link>
        </ul>
      </div>
    );
  }
}

export default Header;
