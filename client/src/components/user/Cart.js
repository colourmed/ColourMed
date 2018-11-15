import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCartItems, removeItemsFromCart } from '../../store/actions/cart';
import { fetchRobes } from '../../store/actions/robes';
import { stopEventPropagation } from '../../services/stopPropagation';
import '../../css/user/Cart.css';

import Overlay from '../universal/Overlay';
import RobeCard from '../universal/RobeCard';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uniqueIds: [],
      uniqueRobes: [],
      robeToRemove: {},
      showRemoveOverlay: false
    };

    this.getUniqueRobesAndIds = this.getUniqueRobesAndIds.bind(this);
    this.showRemoveFromCartOverlay = this.showRemoveFromCartOverlay.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
  }

  componentDidMount() {
    this.props.fetchCartItems();
    
    this.props.fetchRobes().then(() => {
      const uniqueRobesAndIds = this.getUniqueRobesAndIds([], []);
      this.setState(uniqueRobesAndIds);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    let { uniqueIds, uniqueRobes } = this.state;
    const { cart, robes } = this.props;

    if (cart && robes) {
      // If cart items were removed, reset uniqueIds and uniqueRobes
      if (prevProps.cart.length !== cart.length) {
        uniqueIds = [];
        uniqueRobes = [];
      }

      const uniqueRobesAndIds = this.getUniqueRobesAndIds(uniqueIds, uniqueRobes);

      if (prevState.uniqueIds !== uniqueIds) {
        this.setState(uniqueRobesAndIds);
      }
    }
  }

  getUniqueRobesAndIds(uniqueIds, uniqueRobes) {
    const { cart, robes } = this.props;

    cart.forEach(cartItemId => {
      const foundRobe = robes.find(robe => robe._id === cartItemId);

      if (foundRobe) {
        if (!uniqueIds.includes(cartItemId)) {
          uniqueIds.push(cartItemId);

          const robeOccurrenciesInCart = this.countRobeOccurrencies(
            cart,
            cartItemId
          );

          uniqueRobes.push({
            ...foundRobe,
            itemCount: robeOccurrenciesInCart
          });
        }
      }
    });

    return { uniqueIds, uniqueRobes };
  }

  countRobeOccurrencies(cart, robeId) {
    let occurrencies = 0;

    cart.forEach(id => {
      if (id === robeId) {
        occurrencies++;
      }
    });

    return occurrencies;
  }

  showRemoveFromCartOverlay(e, robe) {
    stopEventPropagation(e);

    this.setState({
      showRemoveOverlay: true,
      robeToRemove: robe
    });
  }

  handleRemoveFromCart() {
    const { robeToRemove } = this.state;

    this.props.removeItemsFromCart(robeToRemove._id);
  }

  render() {
    let { uniqueRobes, robeToRemove } = this.state;
    const { history, removeError, removeSuccess } = this.props;

    history.listen(() => {
      removeError();
      removeSuccess();
    });

    const RemoveOverlay = props => (
      <div className="remove-overlay">
        <h3 className="overlay-title">
          Esti sigur ca vrei sa elimini "{robeToRemove.title}" din cos?
        </h3>

        <button
          className="overlay-cta"
          id="remove-button"
          onClick={() => {
            props.handleRemoveFromCart();
            props.closeOverlay();
          }}>
          Elimina
        </button>
      </div>
    );

    const cartItems = uniqueRobes.map(robe => {
      return (
        <RobeCard
          robe={robe}
          key={robe._id}
          handleCardClick={() => {
            history.push(`/products/${robe._id}`);
          }}
          showCartControls={true}
          showRemoveFromCartOverlay={(e, robe) =>
            this.showRemoveFromCartOverlay(e, robe)
          }
        />
      );
    });

    return (
      <div id="cart">
        <h2 id="cart-title">Cos de cumparaturi</h2>

        <div id="cart-items">
          {cartItems.length ? (
            cartItems
          ) : (
            <h4 className="no-products-message">Nu exista produse in cos.</h4>
          )}
        </div>

        {this.state.showRemoveOverlay ? (
          <Overlay
            content={
              <RemoveOverlay
                handleRemoveFromCart={this.handleRemoveFromCart}
                closeOverlay={() => {
                  this.setState({ showRemoveOverlay: false });
                }}
              />
            }
            closeOverlay={() => {
              this.setState({ showRemoveOverlay: false });
            }}
            maxWidth="450px"
          />
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
    robes: state.robes
  };
}

export default connect(
  mapStateToProps,
  { fetchCartItems, fetchRobes, removeItemsFromCart }
)(Cart);
