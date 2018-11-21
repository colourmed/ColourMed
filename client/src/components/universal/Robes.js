import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRobes } from '../../store/actions/robes';
import {
  fetchCartItems,
  addItemToCart,
  removeItemsFromCart
} from '../../store/actions/cart';
import { stopEventPropagation } from '../../services/stopPropagation';
import '../../css/universal/Robes.css';

import RobeCard from './RobeCard';
import ProductForm from '../admin/ProductForm';
import Overlay from './Overlay';
import AddToCartOverlay from '../user/AddToCartOverlay';

class Robes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditOverlay: false,
      showRemoveOverlay: false,
      showAddOverlay: false,
      robeToRemoveId: '',
      robeToEdit: {},
      robeToAdd: {}
    };

    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleEditRobe = this.handleEditRobe.bind(this);
    this.handleRemoveRobe = this.handleRemoveRobe.bind(this);
    this.showRemoveRobeOverlay = this.showRemoveRobeOverlay.bind(this);
    this.showEditRobeOverlay = this.showEditRobeOverlay.bind(this);
    this.showAddRobeOverlay = this.showAddRobeOverlay.bind(this);
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

  handleAddToCart(robe) {
    this.props.addItemToCart(robe);
  }

  showEditRobeOverlay(e, id) {
    stopEventPropagation(e);

    const { robes } = this.props;

    // .filter() returns an array so we need to get the first (and only) element.
    const robeToEdit = robes.filter(robe => robe._id === id)[0];

    this.setState({
      showEditOverlay: true,
      robeToEdit
    });
  }

  showRemoveRobeOverlay(e, id) {
    stopEventPropagation(e);
    this.setState({ showRemoveOverlay: true, robeToRemoveId: id });
  }

  showAddRobeOverlay(e, robe) {
    stopEventPropagation(e);
    this.setState({ showAddOverlay: true, robeToAdd: robe });
  }

  hideOverlays() {
    this.setState({
      showEditOverlay: false,
      showRemoveOverlay: false,
      showAddOverlay: false,
      robeToRemoveId: '',
      robeToEdit: {}
    });
  }

  render() {
    const {
      showEditOverlay,
      showRemoveOverlay,
      showAddOverlay,
      robeToEdit,
      robeToAdd
    } = this.state;

    const {
      robes,
      showAdminControls,
      showUserControls,
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

    const robesList = robes.map(robe => (
      <RobeCard
        robe={robe}
        key={robe._id}
        handleCardClick={this.handleCardClick}
        showEditRobeOverlay={this.showEditRobeOverlay}
        showRemoveRobeOverlay={this.showRemoveRobeOverlay}
        showAddRobeOverlay={this.showAddRobeOverlay}
        showAdminControls={showAdminControls}
        showUserControls={showUserControls}
      />
    ));

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
          Ești sigur că vrei să ștergi acest produs?
        </h3>

        <button
          className="overlay-cta"
          id="remove-button"
          onClick={() => {
            props.handleRemoveRobe();
            props.closeOverlay();
          }}>
          Ștergere
        </button>
      </div>
    );

    return (
      <section id="robes">
        <h2>Halate</h2>

        <div id="robe-list">{robesList}</div>

        {showAddOverlay ? (
          <Overlay
            content={<AddToCartOverlay robe={robeToAdd} handleAddToCart={this.handleAddToCart} />}
            closeOverlay={() => this.hideOverlays()}
            maxWidth="300px"
          />
        ) : null}

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

function mapStateToProps(state) {
  return {
    cart: state.cart,
    robes: state.robes
  };
}

export default connect(
  mapStateToProps,
  { fetchCartItems, addItemToCart, removeItemsFromCart, fetchRobes }
)(Robes);
