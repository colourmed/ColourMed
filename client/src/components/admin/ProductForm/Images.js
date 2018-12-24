import React, { Component } from "react";

class Images extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.handleChange(e);
  }

  render() {
    const { images } = this.props;

    return (
      <div className='images'>
        <label htmlFor='images-input'>Imagini:</label>
        <br />
        <textarea
          type='text'
          name='imageURLs'
          id='images-input'
          defaultValue={images.join(",")}
          required
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Images;
