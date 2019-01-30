import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
import "../../css/universal/Footer.css";

class Footer extends Component {
  render() {
    return (
      <div id="footer">
        <Link to="/">ColourMed</Link>
        <Link to="/" onClick={() => this.props.logout()}>
          Log Out
        </Link>
      </div>
    );
  }
}

export default connect(
  null,
  { logout }
)(Footer);
