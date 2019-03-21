import React, { Component } from "react";

class SizesReferenceInput extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.handleChange(e);
  }

  render() {
    const { sizesReference } = this.props;

    return (
      <div className='sizes-reference-input'>
        <label htmlFor='sizesReference'>Tabel Mărimi:</label>
        <br />
        <input
          type='text'
          name='sizesReference'
          id='sizesReference'
          defaultValue={sizesReference}
          pattern='.*\S+.*'
          onChange={this.handleChange}
        />
        <br />
      </div>
    );
  }
}

export default SizesReferenceInput;
