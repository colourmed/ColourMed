import React, { Component } from 'react';
import idGenerator from 'react-id-generator';
import { ALPHABET } from '../../../constants/Alphabet';
import '../../../css/admin/ProductForm.css';

import TitleInput from './TitleInput';
import Description from './Description';
import Patterns from './Patterns';
import PriceInput from './PriceInput';
import Colors from './Colors';
import Images from './Images';
import Gender from './Gender';
import SizesInput from './SizesInput';
import SizesReferenceInput from './SizesReferenceInput';

class ProductForm extends Component {
  constructor(props) {
    super(props);

    const { forMen, colors, patterns, images, sizes, sizesReference, title, description, price } = this.props.robeToEdit;

    const colorPickerIds = colors.map(() => 'color-picker-' + idGenerator());
    const patternInputIds = patterns.map(() => 'pattern-input-' + idGenerator());
    const imageInputIds = images.map(() => 'image-input-' + idGenerator());

    this.state = {
      colorPickerIds,
      colorPickerValues: colors,
      patternInputIds,
      imageInputIds,
      title,
      description,
      price,
      forMen,
      sizesReference,
      sizes: sizes.join(',')
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addColorPicker = this.addColorPicker.bind(this);
    this.removeColorPicker = this.removeColorPicker.bind(this);
    this.addPatternInput = this.addPatternInput.bind(this);
    this.removePatternInput = this.removePatternInput.bind(this);
    this.addImageInput = this.addImageInput.bind(this);
    this.removeImageInput = this.removeImageInput.bind(this);
    this.changeGender = this.changeGender.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { colorPickerIds, patternInputIds, imageInputIds, title, description, price, forMen, sizes, sizesReference } = this.state;

    let colorPickerValues = [];

    // Get color picker values
    for (let i = 0; i < colorPickerIds.length; i++) {
      const currentColorPicker = document.getElementById(colorPickerIds[i]);
      colorPickerValues.push(currentColorPicker.value);
    }

    let patterns = [];

    // Get patterns
    for (let i = 0; i < patternInputIds.length; i++) {
      const currentPatternInput = document.getElementById(patternInputIds[i]);
      patterns.push(currentPatternInput.value);
    }

    // Set colors to localStorage
    localStorage.setItem('lastColors', JSON.stringify(colorPickerValues));

    const images = [];

    // Get images
    for (let i = 0; i < imageInputIds.length; i++) {
      const currentImageInput = document.getElementById(imageInputIds[i]);
      images.push(currentImageInput.value);
    }

    // Get array of sizes
    const sizesList = sizes.trim().split(',');

    const robe = {
      title,
      description,
      price,
      colorPickerValues,
      patterns,
      images,
      forMen,
      sizesList,
      sizesReference
    };

    this.props.handleData(robe);
    this.props.onSubmitAction();
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

  addPatternInput() {
    const newPatternInputId = 'pattern-input-' + idGenerator();

    this.setState(prevState => ({
      patternInputIds: [...prevState.patternInputIds, newPatternInputId]
    }));
  }

  removePatternInput() {
    const { patternInputIds } = this.state;

    if (this.state.patternInputIds.length > 0) {
      patternInputIds.pop();
    }

    this.setState({ patternInputIds });
  }

  addImageInput() {
    const newImageInputId = 'image-input-' + idGenerator();

    this.setState(prevState => ({
      imageInputIds: [...prevState.imageInputIds, newImageInputId]
    }));
  }

  removeImageInput() {
    const { imageInputIds } = this.state;

    if (this.state.imageInputIds.length > 1) {
      imageInputIds.pop();
    }

    this.setState({ imageInputIds });
  }

  changeGender(forMen) {
    this.setState({ forMen });
  }

  render() {
    const { colorPickerIds, patternInputIds, imageInputIds, forMen } = this.state;
    const { ctaText } = this.props;

    const { title, description, colors, patterns, sizes, sizesReference, images, price } = this.props.robeToEdit;

    const colorPickers = colorPickerIds.map((id, index) => (
      <input type='color' name='color' defaultValue={colors[index]} id={id} key={id} />
    ));

    const patternInputs = patternInputIds.map((id, index) => (
      <div className='pattern-field' key={id}>
        <input type='text' name='pattern-input' defaultValue={patterns[index]} className='pattern-input' id={id} />
        <div className='pattern-number'>{ALPHABET.LETTERS[index]}</div>
      </div>
    ));

    const imageInputs = imageInputIds.map((id, index) => (
      <div className='image-field' key={id}>
        <input type='text' name='image-input' required defaultValue={images[index]} className='image-input' id={id} />
        <div className='image-number'>{index + 1}</div>
      </div>
    ));

    return (
      <div className='form-container' id='product-form'>
        <form onSubmit={this.handleSubmit}>
          <TitleInput title={title} handleChange={this.handleChange} />
          <Description description={description} handleChange={this.handleChange} />
          <Patterns
            patternInputs={patternInputs}
            addPatternInput={this.addPatternInput}
            removePatternInput={this.removePatternInput}
          />
          <PriceInput price={price} handleChange={this.handleChange} />
          <Colors
            colorPickers={colorPickers}
            addColorPicker={this.addColorPicker}
            removeColorPicker={this.removeColorPicker}
          />
          <Images
            imageInputs={imageInputs}
            addImageInput={this.addImageInput}
            removeImageInput={this.removeImageInput}
          />
          <Gender isToggled={forMen} changeToggledValue={this.changeGender} />
          <SizesInput sizes={sizes} handleChange={this.handleChange} />
          <SizesReferenceInput sizesReference={sizesReference} handleChange={this.handleChange} />

          <button type='submit'>{ctaText}</button>
        </form>
      </div>
    );
  }
}

ProductForm.defaultProps = {
  robeToEdit: {
    colors: JSON.parse(localStorage.getItem('lastColors')) || ['#000000'],
    patterns: [''],
    sizes: [],
    images: [''],
    title: '',
    price: '',
    forMen: true
  }
};

export default ProductForm;
