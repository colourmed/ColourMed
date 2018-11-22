import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/universal/Footer.css';

class Footer extends Component {
  render() {
    return (
      <div id="footer">
        <Link to="/">
          ColourMed
        </Link>
      </div>
    );
  }
}

export default Footer;
