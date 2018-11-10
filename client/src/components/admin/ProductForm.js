import React, { Component } from 'react';
import idGenerator from 'react-id-generator';
import '../../css/admin/ProductForm.css';

import Switch from '../universal/Switch';

class ProductForm extends Component {
  constructor(props) {
    super(props);

    const firstColorPickerId = 'color-picker-' + idGenerator();

    this.state = {
      colorPickerIds: [firstColorPickerId],
      imageURLs: '',
      forMen: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addColorPicker = this.addColorPicker.bind(this);
    this.removeColorPicker = this.removeColorPicker.bind(this);
    this.changeGender = this.changeGender.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      colorPickerIds,
      imageURLs,
      title,
      description,
      price,
      forMen,
      sizes
    } = this.state;

    let colorPickerValues = [];

    // Get color picker values
    for (let i = 0; i < colorPickerIds.length; i++) {
      const currentColorPicker = document.getElementById(colorPickerIds[i]);
      colorPickerValues.push(currentColorPicker.value);
    }

    // Get trimmed image urls
    const images = imageURLs.trim().split(',');

    // Get array of sizes
    const sizesList = sizes.split(',');

    // Check if there are any inputed images (input's "required" doesn't check for trimmed strings)
    if (!images.length || !images[0]) {
      this.props.addError('Please add an image before adding a new product.');
    } else {
      const robe = {
        title,
        description,
        price,
        colorPickerValues,
        images,
        forMen,
        sizesList
      };

      this.props.handleData(robe);
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addColorPicker() {
    const newColorPickerId = 'color-picker-' + idGenerator();

    this.setState(prevState => ({
      colorPickerIds: [...prevState.colorPickerIds, newColorPickerId]
    }));
  }

  removeColorPicker() {
    const { colorPickerIds } = this.state;

    if (this.state.colorPickerIds.length > 1) {
      colorPickerIds.pop();
    }

    this.setState({ colorPickerIds });
  }

  changeGender(forMen) {
    this.setState({ forMen });
  }

  render() {
    const { colorPickerIds, forMen } = this.state;

    const colorPickers = colorPickerIds.map(id => (
      <input type="color" name="color" id={id} key={id} />
    ));

    return (
      <div className="form-container" id="product-form">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">Titlu:</label>
          <br />
          <input
            type="text"
            name="title"
            required
            pattern=".*\S+.*"
            onChange={this.handleChange}
          />
          <br />

          <label htmlFor="description">Descriere:</label>
          <br />
          <textarea
            type="text"
            name="description"
            onChange={this.handleChange}
          />
          <br />

          <label htmlFor="price">Pret:</label>
          <br />
          <input
            type="number"
            name="price"
            required
            pattern=".*\S+.*"
            onChange={this.handleChange}
          />
          <br />

          <label>Culori:</label>
          <br />
          <div className="color-pickers">
            <input type="button" value="-" onClick={this.removeColorPicker} />
            {colorPickers}
            <input type="button" value="+" onClick={this.addColorPicker} />
          </div>
          <br />

          <label htmlFor="images-input">Imagini:</label>
          <br />
          <textarea
            type="text"
            name="imageURLs"
            id="images-input"
            required
            onChange={this.handleChange}
          />

          <label>Sex:</label>
          <Switch isToggled={forMen} changeToggledValue={this.changeGender} />
          <br />
          <br />

          <label htmlFor="sizes">Marimi:</label>
          <br />
          <input
            type="text"
            name="sizes"
            required
            pattern=".*\S+.*"
            onChange={this.handleChange}
          />
          <br />

          <button type="submit">Adauga Produs</button>
        </form>
      </div>
    );
  }
}

export default ProductForm;
