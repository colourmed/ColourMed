import React, { Component } from "react";

class TitleInput extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.handleChange(e);
  }

  render() {
    const { title } = this.props;

    return (
      <div className='title-input'>
        <label htmlFor='title'>Titlu:</label>
        <br />
        <input
          type='text'
          name='title'
          required
          pattern='.*\S+.*'
          defaultValue={title}
          onChange={this.handleChange}
        />
        <br />
      </div>
    );
  }
}

export default TitleInput;
