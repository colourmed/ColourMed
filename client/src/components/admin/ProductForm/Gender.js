import React, { Component } from "react";
import Switch from "../../universal/Switch";

class Gender extends Component {
  render() {
    const { isToggled, changeToggledValue } = this.props;

    return (
      <div className='gender'>
        <label>Pentru:</label>
        <Switch isToggled={isToggled} changeToggledValue={changeToggledValue} />
        <br />
        <br />
      </div>
    );
  }
}

export default Gender;
