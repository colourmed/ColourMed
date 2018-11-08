import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/user/Footer.css';

class Footer extends Component {
  render() {
    return (
      <div id="footer">
        <Link to="/admin" className="admin">
          Admin
        </Link>
      </div>
    );
  }
}

export default Footer;
