import React, { Component } from 'react';
import '../../css/user/AddToCartOverlay.css';

import Color from '../universal/Color';

class AddToCartOverlay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedColorIndex: 0
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { selectedColorIndex } = this.state;
    const { robe, handleAddToCart } = this.props;

    // Get selected color
    const selectedColor = robe.colors[selectedColorIndex];

    // Get selected size
    const selectField = document.getElementById('size-select');
    const selectedSize = selectField.options[selectField.selectedIndex].value;

    // Get quantity
    const quantityInput = document.getElementById('quantity-input');
    const quantity = quantityInput.value;

    const newRobe = {
      ...robe,
      id: robe._id,
      colors: [selectedColor],
      sizes: [selectedSize],
      quantity
    };

    handleAddToCart(newRobe);
  }

  render() {
    const { selectedColorIndex } = this.state;
    const { robe } = this.props;

    const robeColors = robe.colors.map((color, colorIndex) => (
      <Color
        color={color}
        key={color}
        selected={selectedColorIndex === colorIndex ? true : false}
        size="25px"
        handleColorClick={() =>
          this.setState({ selectedColorIndex: colorIndex })
        }
      />
    ));

    const robeSizes = robe.sizes.map(size => (
      <option key={size} value={size}>
        {size}
      </option>
    ));

    return (
      <div id="add-to-cart-overlay">
        <form onSubmit={this.handleSubmit}>
          <h2 className="overlay-title">Opțiuni Produs</h2>

          <h3 className="add-robe-title">{robe.title}</h3>

          <h4 className="input-label">Culoare:</h4>
          <div className="robe-colors">{robeColors}</div>
          <br />

          <h4 className="input-label">Mărime:</h4>
          <select name="size-select" id="size-select">
            {robeSizes}
          </select>
          <br />

          <h4 className="input-label">Cantitate</h4>
          <input
            type="number"
            name="quantity"
            id="quantity-input"
            defaultValue="1"
            required
            min="1"
          />

          <button type="submit">Adaugă in coș</button>
        </form>
      </div>
    );
  }
}

export default AddToCartOverlay;
