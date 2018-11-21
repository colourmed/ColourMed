import React, { Component } from 'react';
import '../../css/universal/Color.css';

class Color extends Component {
  render() {
    const { color, size, selected, handleColorClick } = this.props;

    return (
      <div
        className="color"
        style={{
          backgroundColor: color,
          width: size,
          height: size,
          boxShadow: selected ? '3px 3px 10px #444' : 'none',
          border: selected ? '1px solid #000' : '1px solid #999'
        }}
        onClick={handleColorClick}
      />
    );
  }
}

Color.defaultProps = {
  backgroundColor: '#000000',
  size: '10px',
  selected: false,
  handleColorClick: () => {}
};

export default Color;
