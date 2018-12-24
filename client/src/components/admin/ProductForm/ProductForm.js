import React, { Component } from "react";
import idGenerator from "react-id-generator";
import "../../../css/admin/ProductForm.css";

import TitleInput from "./TitleInput";
import Description from "./Description";
import PriceInput from "./PriceInput";
import Colors from "./Colors";
import Images from "./Images";
import Gender from "./Gender";
import SizesInput from "./SizesInput";

class ProductForm extends Component {
  constructor(props) {
    super(props);

    const {
      forMen,
      colors,
      images,
      sizes,
      title,
      description,
      price
    } = this.props.robeToEdit;

    const colorPickerIds = colors.map(() => "color-picker-" + idGenerator());

    this.state = {
      colorPickerIds,
      colorPickerValues: colors,
      title,
      description,
      price,
      forMen,
      imageURLs: images.join(","),
      sizes: sizes.join(",")
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
    const images = imageURLs.trim().split(",");

    // Get array of sizes
    const sizesList = sizes.trim().split(",");

    // Check if there are any inputed images (input's "required" doesn't check for trimmed strings)
    if (!images.length || !images[0]) {
      this.props.addError(
        "Te rog adaugă o imagine inainte de a adăuga un produs."
      );
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

    this.props.onSubmitAction();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addColorPicker() {
    const newColorPickerId = "color-picker-" + idGenerator();

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
    const { ctaText } = this.props;

    const {
      title,
      description,
      colors,
      sizes,
      images,
      price
    } = this.props.robeToEdit;

    const colorPickers = colorPickerIds.map((id, index) => (
      <input
        type='color'
        name='color'
        defaultValue={colors[index]}
        id={id}
        key={id}
      />
    ));

    return (
      <div className='form-container' id='product-form'>
        <form onSubmit={this.handleSubmit}>
          <TitleInput title={title} handleChange={this.handleChange} />
          <Description
            description={description}
            handleChange={this.handleChange}
          />
          <PriceInput price={price} handleChange={this.handleChange} />
          <Colors
            colorPickers={colorPickers}
            addColorPicker={this.addColorPicker}
            removeColorPicker={this.removeColorPicker}
          />
          <Images images={images} handleChange={this.handleChange} />
          <Gender isToggled={forMen} changeToggledValue={this.changeGender} />
          <SizesInput sizes={sizes} handleChange={this.handleChange} />

          <button type='submit'>{ctaText}</button>
        </form>
      </div>
    );
  }
}

ProductForm.defaultProps = {
  robeToEdit: {
    colors: ["#000000"],
    sizes: [],
    images: [],
    title: "",
    price: "",
    forMen: true
  }
};

export default ProductForm;
