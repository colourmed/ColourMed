import React, { Component } from 'react';
import '../../css/universal/Switch.css';

class Switch extends Component {
  constructor(props) {
    super(props);

    this.onSwitchClick = this.onSwitchClick.bind(this);
  }

  componentDidMount() {
    let { isToggled } = this.props;

    let toggleContainer = document.getElementById('toggle-container');

    if (!isToggled) {
      toggleContainer.style.clipPath = 'inset(0 0 0 50%)';
      toggleContainer.style.backgroundColor = 'orangered';
    } else {
      toggleContainer.style.clipPath = 'inset(0 50% 0 0)';
      toggleContainer.style.backgroundColor = 'dodgerblue';
    }
  }

  onSwitchClick() {
    let { isToggled } = this.props;

    let toggleContainer = document.getElementById('toggle-container');

    this.props.changeToggledValue(!isToggled);

    if (isToggled) {
      toggleContainer.style.clipPath = 'inset(0 0 0 50%)';
      toggleContainer.style.backgroundColor = 'orangered';
    } else {
      toggleContainer.style.clipPath = 'inset(0 50% 0 0)';
      toggleContainer.style.backgroundColor = 'dodgerblue';
    }
  }

  render() {
    return (
      <div id="switch-container" onClick={this.onSwitchClick} >
        <div className="inner-container">
          <div className="toggle">
            <p>Femei</p>
          </div>
          <div className="toggle">
            <p>Barbati</p>
          </div>
        </div>

        <div className="inner-container" id='toggle-container'>
          <div className="toggle">
            <p>Femei</p>
          </div>
          <div className="toggle">
            <p>Barbati</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Switch;