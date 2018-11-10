import React, { Component } from 'react';
import { ICONS } from '../../constants/Icons';
import '../../css/universal/Robes.css';

import Icon from '../universal/Icon';
import Overlay from '../universal/Overlay';

class Robes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditOverlay: false,
      showRemoveOverlay: false,
      robeId: ''
    };

    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleRemoveRobe = this.handleRemoveRobe.bind(this);
  }

  handleCardClick(id) {
    const { history } = this.props;

    history.push(`/products/${id}`);
  }

  handleRemoveRobe() {
    const { robeId } = this.state;
    const { removeRobe } = this.props;

    removeRobe(robeId);
  }

  // Stops the element's parent onClick event (to stop getting redirected to product's page)
  stopEventPropagation(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }

  showEditRobeOverlay(e, id) {
    this.stopEventPropagation(e);
    this.setState({ showEditOverlay: true, robeId: id });
  }

  showRemoveRobeOverlay(e, id) {
    this.stopEventPropagation(e);
    this.setState({ showRemoveOverlay: true, robeId: id });
  }

  hideOverlays() {
    this.setState({
      showEditOverlay: false,
      showRemoveOverlay: false,
      robeId: ''
    });
  }

  render() {
    const { showEditOverlay, showRemoveOverlay } = this.state;

    const {
      robes,
      showAdminControls,
      history,
      removeError,
      removeSuccess
    } = this.props;

    history.listen(() => {
      removeError();
      removeSuccess();
    });

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
        </div>
      );
    });

    const EditOverlay = () => (
      <div className="edit-overlay">
        <h3 className="overlay-title">Editare Produs</h3>
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

export default Robes;
