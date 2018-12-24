import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRobes } from '../../store/actions/robes';
import { fetchFeatured } from '../../store/actions/featured';
import { fetchCartItems, addItemToCart } from '../../store/actions/cart';
import { removeError } from '../../store/actions/errors';
import { removeSuccess } from '../../store/actions/success';
import '../../css/universal/Main.css';

import Error from '../universal/Error';
import Success from '../universal/Success';
import Contact from './Contact';
import Products from './Products';
import DetailedProduct from './DetailedProduct';
import Cart from './Cart';
import Checkout from './Checkout';
import Login from './Login';

class Main extends Component {
  componentWillMount() {
    this.props.fetchRobes().then(() => {
      this.props.fetchCartItems();
    });
  }

  render() {
    const {
      errors,
      success,
      history,
      robes,
      cart,
      fetchRobes,
      featured,
      addItemToCart,
      fetchFeatured,
      removeSuccess,
      removeError
    } = this.props;

    return (
      <div id="main">
        <Error error={errors} removeError={removeError} />
        <Success success={success} removeSuccess={removeSuccess} />

        <Switch>
          <Route exact path="/" render={() => <Redirect to="/products" />} />

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
            path="/checkout"
            render={() => (
              <Checkout
                cart={cart}
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

          <Route
            exact
            path="/products/:product_id"
            render={props => (
              <DetailedProduct
                robes={robes}
                addItemToCart={addItemToCart}
                match={props.match}
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
    cart: state.cart,
    errors: state.errors,
    success: state.success
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    {
      fetchRobes,
      fetchCartItems,
      fetchFeatured,
      addItemToCart,
      removeSuccess,
      removeError
    }
  )(Main)
);
