import React, { Component } from 'react';

class Patterns extends Component {
  render() {
    const { patternInputs, removePatternInput, addPatternInput } = this.props;

    return (
      <div className='patterns'>
        <label>Modele:</label>
        <br />

        <div className='pattern-inputs'>
          <div className='pattern-inputs-bottons'>
            <input type='button' value='-' onClick={removePatternInput} />
            <input type='button' value='+' onClick={addPatternInput} />
          </div>
          {patternInputs}
        </div>
        <br />
      </div>
    );
  }
}

export default Patterns;
