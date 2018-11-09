import React, { Component } from 'react';
import idGenerator from 'react-id-generator';
import { connect } from 'react-redux';
import { addRobe } from '../../store/actions/robes';
import '../../css/admin/NewProduct.css';

import Switch from '../universal/Switch';

class NewProduct extends Component {
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

    const { colorPickerIds, imageURLs, title, description, price, forMen } = this.state;

    let colorPickerValues = [];

    // Get color picker values
    for (let i = 0; i < colorPickerIds.length; i++) {
      const currentColorPicker = document.getElementById(colorPickerIds[i]);
      colorPickerValues.push(currentColorPicker.value);
    }

    // Get trimmed image urls
    const images = imageURLs.trim().split(',');

    // Check if there are any inputed images (input's "required" doesn't check for trimmed strings)
    if (!images.length || !images[0]) {
      this.props.addError('Please add an image before adding a new product.');
    } else {
      this.props.addRobe({
        title,
        description,
        price,
        colorPickerValues,
        images,
        forMen
      });
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
    const colorPickerIds = [...this.state.colorPickerIds];

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
    const { history, removeError, removeSuccess } = this.props;

    history.listen(() => {
      removeError();
      removeSuccess();
    });

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
              name="imageURLs"
              id="images-input"
              required
              onChange={this.handleChange}
            />

            <label>Sex:</label>
            <Switch isToggled={forMen} changeToggledValue={this.changeGender}/>

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
