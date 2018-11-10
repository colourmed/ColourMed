import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addRobe } from '../../store/actions/robes';
import '../../css/admin/NewProduct.css';

import ProductForm from './ProductForm';

class NewProduct extends Component {
  constructor(props) {
    super(props);

    this.addNewRobe = this.addNewRobe.bind(this);
  }
  
  addNewRobe(newRobe) {
    this.props.addRobe(newRobe);
  }

  render() {
    const { history, removeError, removeSuccess } = this.props;

    history.listen(() => {
      removeError();
      removeSuccess();
    });

    return (
      <div id="new-product">
        <h2>Produs Nou</h2>

        <ProductForm handleData={this.addNewRobe} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    robes: state.robes
  };
}

export default connect(
  mapStateToProps,
  { addRobe }
)(NewProduct);
