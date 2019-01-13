import React, { Component } from "react";

class Colors extends Component {
  render() {
    const { removeColorPicker, addColorPicker, colorPickers } = this.props;

    return (
      <div className='colors'>
        <label>Culori:</label>
        <br />
        <div className='color-pickers'>
          <input type='button' value='-' onClick={removeColorPicker} />
          <input type='button' value='+' onClick={addColorPicker} />
          {colorPickers}
        </div>
        <br />
      </div>
    );
  }
}

export default Colors;
