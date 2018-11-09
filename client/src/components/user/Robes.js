import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/user/Robes.css';

class Robes extends Component {
  render() {
    const { robes } = this.props;

    // Render robe card for each robe
    const robesList = robes.map(robe => {
      // Render div for each color
      const robeColors = robe.colors.map(color => (
        <div className="robe-color" style={{ backgroundColor: color }} key={color} />
      ));

      return (
        <Link to={`/products/${robe._id}`} className="robe-card" key={robe._id}>
          <img src={robe.images[0]} alt={robe.title} />

          <h3 className="robe-title">{robe.title}</h3>
          <div className="robe-colors">{robeColors}</div>
          <h4 className="robe-price">{robe.price} RON</h4>
        </Link>
      );
    });

    return (
      <div id="robes">
        <h2>Halate</h2>

        <div id="robe-list">{robesList}</div>
      </div>
    );
  }
}

Robes.defaultProps = {
  robes: []
};

export default Robes;
