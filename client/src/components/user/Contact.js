import React, { Component } from "react";
import "../../css/user/Contact.css";

class Contact extends Component {
  render() {
    return (
      <div id="contact">
        <h1>Informații de Contact</h1>
        <div id="contact-info">
          <p className="name">Laura Grigorie</p>
          <p className="phone-number">0766247070</p>
          <p className="email">colourmed.design@gmail.com</p>
          <p className="address">Reghin, Mureș</p>
        </div>
      </div>
    );
  }
}

export default Contact;
