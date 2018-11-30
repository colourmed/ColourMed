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
      robeToRemove: {},
      showRemoveOverlay: false
    };

    this.showRemoveFromCartOverlay = this.showRemoveFromCartOverlay.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
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

    this.props.removeItemsFromCart(robeToRemove);
  }

  render() {
    const { robeToRemove } = this.state;
    const { history, removeError, removeSuccess, cart } = this.props;

    history.listen(() => {
      removeError();
      removeSuccess();
    });

    const RemoveOverlay = props => (
      <div className="remove-overlay">
        <h3 className="overlay-title">
          Ești sigur că vrei să elimini "{robeToRemove.title}" din coș?
        </h3>

        <button
          className="overlay-cta"
          id="remove-button"
          onClick={() => {
            props.handleRemoveFromCart();
            props.closeOverlay();
          }}>
          Elimină
        </button>
      </div>
    );

    const cartItems = cart.map(item => (
      <RobeCard
        robe={item}
        colorSize="15px"
        key={`${item._id}-${item.colors[0]}-${item.sizes[0]}`}
        handleCardClick={() => {
          history.push(`/products/${item._id}`);
        }}
        showCartControls={true}
        showRemoveFromCartOverlay={(e, item) =>
          this.showRemoveFromCartOverlay(e, item)
        }
      />
    ));

    if (cartItems.length) {
      return (
        <div id="cart">
          <h2 id="cart-title">Coș de cumparaturi</h2>

          <div id="cart-items">{cartItems}</div>

          <button
            className="checkout-btn"
            onClick={() => {
              history.push('/checkout');
            }}>
            Cumpara Produse
          </button>

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
    } else {
      return (
        <div id="cart">
          <h2 className="no-products-message" id="cart-title">
            Nu exista produse in coș.
          </h2>
        </div>
      );
    }
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
