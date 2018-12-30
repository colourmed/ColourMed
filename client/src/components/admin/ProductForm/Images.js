import React, { Component } from 'react';

class Images extends Component {
  render() {
    const { imageInputs, removeImageInput, addImageInput } = this.props;

    return (
      <div className='images'>
        <label>Imagini:</label>
        <br />

        <div className='image-inputs'>
          <div className='image-inputs-bottons'>
            <input type='button' value='-' onClick={removeImageInput} />
            <input type='button' value='+' onClick={addImageInput} />
          </div>
          {imageInputs}
        </div>
        <br />
      </div>
    );
  }
}

export default Images;
