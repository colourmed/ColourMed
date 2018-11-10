import React, { Component } from 'react';
import '../../css/universal/Overlay.css';

class Overlay extends Component {
  render() {
    return (
      <div className="overlay">
        <div className="overlay-container" style={{maxWidth: this.props.maxWidth}}>
          <span className="close-overlay" onClick={this.props.closeOverlay}>&#x2715;</span>
          <div className="overlay-content">
            {this.props.content}
          </div>
        </div>
      </div>
    );
  }
}

export default Overlay;