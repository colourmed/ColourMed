import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function withAuth(ComponentToBeRendered) {
  class Authenticate extends Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.isAuthenticated) {
        this.props.history.push('/login');
      }
    }

    render() {
      return <ComponentToBeRendered {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.currentUser.isAuthenticated
    };
  }

  return connect(mapStateToProps)(Authenticate);
}
