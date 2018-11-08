import React, { Component } from 'react';
import '../../css/user/UserInterface.css';

import Header from './Header.js';
import Main from './Main';
import Footer from './Footer';

class UserInterface extends Component {
  render() {
    return (
      <div id="user">
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default UserInterface;
