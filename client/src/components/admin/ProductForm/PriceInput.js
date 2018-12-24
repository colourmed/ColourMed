import React, { Component } from "react";

class PriceInput extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.handleChange(e);
  }

  render() {
    const { price } = this.props;

    return (
      <div className='price-input'>
        <label htmlFor='price'>Preț:</label>
        <br />
        <input
          type='number'
          name='price'
          required
          pattern='.*\S+.*'
          defaultValue={price}
          onChange={this.handleChange}
        />
        <br />
      </div>
    );
  }
}

export default PriceInput;
