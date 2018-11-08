import React, { Component } from 'react';
import idGenerator from 'react-id-generator';
import { connect } from 'react-redux';
import { addRobe } from '../../store/actions/robes';
import '../../css/admin/NewProduct.css';

class NewProduct extends Component {
  constructor(props) {
    super(props);

    const firstColorPickerId = 'color-picker-' + idGenerator();

    this.state = {
      colorPickerIds: [firstColorPickerId],
      imagesURLs: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addColorPicker = this.addColorPicker.bind(this);
    this.removeColorPicker = this.removeColorPicker.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      colorPickerIds,
      imagesURLs,
      title,
      description,
      price
    } = this.state;

    let colorPickerValues = [];

    // Get color picker values
    for (let i = 0; i < colorPickerIds.length; i++) {
      const currentColorPicker = document.getElementById(colorPickerIds[i]);
      colorPickerValues.push(currentColorPicker.value);
    }

    // Get image urls
    const images = imagesURLs.split(',');

    this.props.addRobe({
      title,
      description,
      price,
      colorPickerValues,
      images
    });
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
    const colorPickerIds = [...this.state.colorPickerIds];

    if (this.state.colorPickerIds.length > 1) {
      colorPickerIds.pop();
    }

    this.setState({ colorPickerIds });
  }

  render() {
    const { colorPickerIds } = this.state;

    const colorPickers = colorPickerIds.map(id => (
      <input type="color" name="color" id={id} key={id} />
    ));

    return (
      <div id="new-product">
        <h2>Produs Nou</h2>

        <div className="form-container">
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

            <label>Imagini:</label>
            <br />
            <textarea
              type="text"
              name="imagesURLs"
              id="images-input"
              required
              onChange={this.handleChange}
            />

            <button type="submit">Adauga Produs</button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    robes: state.robes
  };
}

export default connect(
  mapStateToProps,
  { addRobe }
)(NewProduct);