import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ICONS } from '../../constants/Icons';

import { fetchRobes } from '../../store/actions/robes';
import {
  fetchCartItems,
  addItemToCart,
  removeItemFromCart
} from '../../store/actions/cart';

import '../../css/universal/Robes.css';

import ProductForm from '../admin/ProductForm';
import Icon from '../universal/Icon';
import Overlay from '../universal/Overlay';

class Robes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditOverlay: false,
      showRemoveOverlay: false,
      robeToRemoveId: '',
      robeToEdit: {}
    };

    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleEditRobe = this.handleEditRobe.bind(this);
    this.handleRemoveRobe = this.handleRemoveRobe.bind(this);
  }

  componentDidMount() {
    this.props.fetchRobes();
    this.props.fetchCartItems();
  }

  handleCardClick(id) {
    const { history } = this.props;

    history.push(`/products/${id}`);
  }

  handleEditRobe(updatedRobe) {
    const { robeToEdit } = this.state;
    const { editRobe } = this.props;

    editRobe(updatedRobe, robeToEdit._id);
  }

  handleRemoveRobe() {
    const { robeToRemoveId } = this.state;
    const { removeRobe } = this.props;

    removeRobe(robeToRemoveId);
  }

  handleAddToCart(e, id) {
    this.stopEventPropagation(e);

    this.props.addItemToCart(id);
  }

  // Stops the element's parent onClick event (to stop getting redirected to product's page)
  stopEventPropagation(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }

  showEditRobeOverlay(e, id) {
    this.stopEventPropagation(e);

    const { robes } = this.props;

    // .filter() returns an array so we need to get the first element.
    const robeToEdit = robes.filter(robe => robe._id === id)[0];

    this.setState({
      showEditOverlay: true,
      robeToEdit
    });
  }

  showRemoveRobeOverlay(e, id) {
    this.stopEventPropagation(e);
    this.setState({ showRemoveOverlay: true, robeToRemoveId: id });
  }

  hideOverlays() {
    this.setState({
      showEditOverlay: false,
      showRemoveOverlay: false,
      robeToRemoveId: '',
      robeToEdit: {}
    });
  }

  render() {
    const { showEditOverlay, showRemoveOverlay, robeToEdit } = this.state;

    const {
      robes,
      showAdminControls,
      history,
      removeError,
      removeSuccess
    } = this.props;

    if (showAdminControls) {
      history.listen(() => {
        removeError();
        removeSuccess();
      });
    }

    // Render robe card for each robe
    const robesList = robes.map(robe => {
      // Render colored div for each color
      const robeColors = robe.colors.map(color => (
        <div
          className="robe-color"
          style={{ backgroundColor: color }}
          key={color}
        />
      ));

      return (
        <div
          onClick={() => this.handleCardClick(robe._id)}
          className="robe-card"
          key={robe._id}>
          <img src={robe.images[0]} alt={robe.title} />
          <h3 className="robe-title">{robe.title}</h3>
          <div className="robe-colors">{robeColors}</div>
          <h4 className="robe-price">{robe.price} RON</h4>

          {showAdminControls ? (
            <div className="admin-controls">
              <button onClick={e => this.showEditRobeOverlay(e, robe._id)}>
                <Icon icon={ICONS.EDIT} color="#777" size={24} />
              </button>
              <button onClick={e => this.showRemoveRobeOverlay(e, robe._id)}>
                <Icon icon={ICONS.REMOVE} color="#c92e2e" size={24} />
              </button>
            </div>
          ) : null}

          {!showAdminControls ? (
            <button
              className="add-to-cart-btn"
              onClick={e => this.handleAddToCart(e, robe._id)}>
              Adauga in cos
            </button>
          ) : null}
        </div>
      );
    });

    const EditOverlay = () => (
      <div className="edit-overlay">
        <h3 className="overlay-title">Editare Produs</h3>

        <ProductForm
          addError={this.props.addError}
          handleData={this.handleEditRobe}
          onSubmitAction={() => {
            this.hideOverlays();
          }}
          robeToEdit={robeToEdit}
          ctaText="Editeaza Produsul"
        />
      </div>
    );

    const RemoveOverlay = props => (
      <div className="remove-overlay">
        <h3 className="overlay-title">
          Esti sigur ca vrei sa stergi acest produs?
        </h3>

        <button
          className="overlay-cta"
          id="remove-button"
          onClick={() => {
            props.handleRemoveRobe();
            props.closeOverlay();
          }}>
          Stergere
        </button>
      </div>
    );

    return (
      <section id="robes">
        <h2>Halate</h2>

        <div id="robe-list">{robesList}</div>

        {showEditOverlay ? (
          <Overlay
            content={<EditOverlay />}
            closeOverlay={() => this.hideOverlays()}
            maxWidth="70%"
          />
        ) : null}

        {showRemoveOverlay ? (
          <Overlay
            content={
              <RemoveOverlay
                handleRemoveRobe={this.handleRemoveRobe}
                closeOverlay={() => this.hideOverlays()}
              />
            }
            closeOverlay={() => this.hideOverlays()}
            maxWidth="450px"
          />
        ) : null}
      </section>
    );
  }
}

Robes.defaultProps = {
  showAdminControls: false
};

function mapStateToProps(state) {
  return {
    cart: state.cart,
    robes: state.robes
  };
}

export default connect(
  mapStateToProps,
  { fetchCartItems, addItemToCart, removeItemFromCart, fetchRobes }
)(Robes);
