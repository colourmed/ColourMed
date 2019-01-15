import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRobes } from '../../store/actions/robes';
import { fetchCartItems, placeOrder } from '../../store/actions/cart';
import '../../css/user/Checkout.css';

import UserDetailsForm from './UserDetailsForm';
import CompactProduct from './CompactProduct';

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalPrice: 0
    };

    this.getTotalPrice = this.getTotalPrice.bind(this);
    this.handleFormData = this.handleFormData.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
  }

  componentDidMount() {
    this.props.fetchRobes().then(() => {
      this.props.fetchCartItems();
    })
    this.getTotalPrice();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.cart.length && this.props.cart.length) {
      this.getTotalPrice();
    }
  }

  getTotalPrice() {
    const { cart } = this.props;

    let totalPrice = 0;

    for (const item of cart) {
      totalPrice += item.price * item.quantity;
    }

    this.setState({ totalPrice });
  }

  handleFormData(dataName, dataValue) {
    this.setState({
      [dataName]: dataValue
    });
  }

  handleOrder() {
    const { placeOrder, history } = this.props;

    placeOrder(this.state, history);
  }

  render() {
    const { totalPrice } = this.state;
    const { cart } = this.props;

    const compactItems = cart.map(item => (
      <CompactProduct
        robe={item}
        key={`compact-${item._id}-${item.sizes[0]}-${item.colors[0]}-${item.patterns[0]}`}
      />
    ));

    if (cart.length) {
      return (
        <div id="checkout">
          <h1 className="checkout-title">Finalizare Comandă</h1>

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

          <p className="total-price">Preț Total: <span>{totalPrice}</span> RON</p>

          <button className="place-order-btn" onClick={this.handleOrder}>
            Plasează Comanda
          </button>
        </div>
      );
    } else {
      return (
        <div id="checkout">
          <h2 className="no-products-message checkout-title">
            Nu există produse in coș.
          </h2>
        </div>
      );
    }
  }
}

export default connect(
  null,
  { fetchCartItems, fetchRobes, placeOrder }
)(Checkout);
