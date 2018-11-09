import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRobes } from '../../store/actions/robes';
import { addError } from '../../store/actions/errors';
import '../../css/universal/Main.css';

import NewProduct from './NewProduct';
import Error from '../universal/Error';

class Main extends Component {
  componentDidMount() {
    this.props.fetchRobes();
  }

  render() {
    const { errors, addError } = this.props;

    const Root = () => <h1>ROOT</h1>;
    const Products = () => <h1>Products</h1>;

    return (
      <div id="admin-main">
        <Error error={errors} />

        <Switch>
          <Route exact path="/admin" component={Root} />
          <Route exact path="/admin/products" component={Products} />
          <Route
            exact
            path="/admin/new"
            render={() => <NewProduct addError={addError} />}
          />
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

export default withRouter(
  connect(
    mapStateToProps,
    { fetchRobes, addError }
  )(Main)
);
