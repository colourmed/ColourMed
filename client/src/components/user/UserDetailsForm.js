import React, { Component } from 'react';
import '../../css/user/UserDetailsForm.css';

class UserDetailsForm extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.handleFormData(e.target.name, e.target.value);
  }

  render() {
    return (
      <div id="user-details-form">
        <form>
          <div className="flex-container">
            <div className="left-side">
              <label htmlFor="firstName">Nume:</label>
              <input
                onChange={this.handleChange}
                type="text"
                id="firstName"
                name="firstName"
              />
            </div>

            <div className="right-side">
              <label htmlFor="lastName">Prenume:</label>
              <input
                onChange={this.handleChange}
                type="text"
                id="lastName"
                name="lastName"
              />
            </div>
          </div>

          <label htmlFor="address">Adresa:</label>
          <input
            onChange={this.handleChange}
            type="text"
            name="address"
            id="address"
          />

          <div className="flex-container">
            <div className="left-side">
              <label htmlFor="phoneNumber">Nr. Telefon:</label>
              <input
                onChange={this.handleChange}
                type="text"
                name="phoneNumber"
                id="phoneNumber"
              />
            </div>

            <div className="right-side">
              <label htmlFor="email">Email:</label>
              <input
                onChange={this.handleChange}
                type="email"
                id="email"
                name="email"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default UserDetailsForm;
