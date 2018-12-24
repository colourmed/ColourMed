import React, { Component } from "react";

class Description extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.handleChange(e);
  }

  render() {
    const { description } = this.props;

    return (
      <div className='description'>
        <label htmlFor='description'>Descriere:</label>
        <br />
        <textarea
          type='text'
          name='description'
          defaultValue={description}
          onChange={this.handleChange}
        />
        <br />
      </div>
    );
  }
}

export default Description;
