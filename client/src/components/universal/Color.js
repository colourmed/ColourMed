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
          boxShadow: selected ? '2px 2px 10px #777' : 'none',
          border: '1px solid #999',
          transform: selected ? 'scale(1.2)' : 'none'
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
