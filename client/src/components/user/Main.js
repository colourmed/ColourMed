import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRobes } from '../../store/actions/robes';
import { fetchFeatured } from '../../store/actions/featured';
import { removeError } from '../../store/actions/errors';
import { removeSuccess } from '../../store/actions/success';
import '../../css/universal/Main.css';

import Error from '../universal/Error';
import Success from '../universal/Success';
import Products from './Products';
import Cart from './Cart';
import Login from './Login';

class Main extends Component {
  componentWillMount() {
    this.props.fetchRobes();
  }

  render() {
    const {
      errors,
      success,
      history,
      robes,
      fetchRobes,
      featured,
      fetchFeatured,
      removeSuccess,
      removeError
    } = this.props;

    const Root = () => <h1>ROOT</h1>;
    const Contact = () => <h1>Contact</h1>;

    return (
      <div id="main">
        <Error error={errors} />
        <Success success={success} />

        <Switch>
          <Route exact path="/" component={Root} />

          <Route exact path="/contact" component={Contact} />

          <Route
            exact
            path="/cart"
            render={() => (
              <Cart
                history={history}
                removeError={removeError}
                removeSuccess={removeSuccess}
              />
            )}
          />

          <Route
            exact
            path="/products"
            render={() => (
              <Products
                history={history}
                robes={robes}
                fetchRobes={fetchRobes}
                featured={featured}
                fetchFeatured={fetchFeatured}
              />
            )}
          />

          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    featured: state.featured,
    robes: state.robes,
    errors: state.errors,
    success: state.success
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { fetchRobes, fetchFeatured, removeSuccess, removeError }
  )(Main)
);
