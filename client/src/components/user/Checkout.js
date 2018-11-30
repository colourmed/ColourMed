import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCartItems, placeOrder } from '../../store/actions/cart';
import '../../css/user/Checkout.css';

import UserDetailsForm from './UserDetailsForm';
import CompactProduct from './CompactProduct';

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleFormData = this.handleFormData.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
  }

  componentWillMount() {
    this.props.fetchCartItems();
  }

  handleFormData(dataName, dataValue) {
    this.setState({
      [dataName]: dataValue
    });
  }

  handleOrder() {
    const { placeOrder, history } = this.props;

    history.push('/products');
    placeOrder(this.state);
  }

  render() {
    const { cart } = this.props;

    const compactItems = cart.map(item => (
      <CompactProduct
        robe={item}
        key={`compact-${item._id}-${item.sizes[0]}-${item.colors[0]}`}
      />
    ));

    if (cart.length) {
      return (
        <div id="checkout">
          <h1 className="checkout-title">Finalizare Comanda</h1>

          <div className="flex-container">
            <div className="user-details">
              <h2 className="title">Detalii Livrare</h2>
              <UserDetailsForm handleFormData={this.handleFormData} />
            </div>

            <div className="compact-products">
              <h2 className="title">Produse</h2>
              <div className="compact-products-list">{compactItems}</div>
            </div>
          </div>

          <button className="place-order-btn" onClick={this.handleOrder}>
            Plaseaza Comanda
          </button>
        </div>
      );
    } else {
      return (
        <div id="checkout">
          <h2 className="no-products-message checkout-title">
            Nu exista produse in coș.
          </h2>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

export default connect(
  mapStateToProps,
  { fetchCartItems, placeOrder }
)(Checkout);
