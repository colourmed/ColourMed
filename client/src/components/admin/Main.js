import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRobes } from '../../store/actions/robes';
import '../../css/user/Main.css';

import NewProduct from './NewProduct';

class Main extends Component {
  componentDidMount() {
    this.props.fetchRobes();
  }

  render() {
    const Root = () => <h1>ROOT</h1>;
    const Products = () => <h1>Products</h1>;

    return (
      <div id="admin-main">
        <Switch>
          <Route exact path='/admin' component={Root} />
          <Route exact path='/admin/products' component={Products} />
          <Route exact path='/admin/new' component={NewProduct} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors,
    robes: state.robes
  };
}

export default withRouter(connect(mapStateToProps, { fetchRobes })(Main));