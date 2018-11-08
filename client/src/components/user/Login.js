import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authUser } from '../../store/actions/auth';
import '../../css/user/Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.authUser('login', this.state).then(() => {
      this.props.history.push('/admin');
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div id="login">
        <h2>Admin Login</h2>

        <div className="form-container">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="email">Email:</label>
            <br />
            <input type="email" name="email" onChange={this.handleChange} />
            <br />

            <label htmlFor="password">Password:</label>
            <br />
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
            />
            <br />

            <button type="submit">Log In</button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors
  };
}

export default connect(
  mapStateToProps,
  { authUser }
)(Login);
