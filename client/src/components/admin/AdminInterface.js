import React, { Component } from 'react';
import '../../css/admin/AdminInterface.css';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

class AdminInterface extends Component {
  render() {
    return (
      <div id="admin">
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default AdminInterface;
