import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRobes } from '../../store/actions/robes';
import '../../css/user/Main.css';

import Robes from './Robes';
import Login from './Login';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      robes: []
    };
  }

  componentDidMount() {
    this.props.fetchRobes().then(() => {
      this.setState({ robes: this.props.robes });
    });
  }

  render() {
    const { robes } = this.state;

    const Root = () => <h1>ROOT</h1>;
    const Contact = () => <h1>Contact</h1>;
    const Cart = () => <h1>Cart</h1>;

    return (
      <div id="main">
        <Switch>
          <Route exact path="/" component={Root} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/cart" component={Cart} />
          <Route
            exact
            path="/products"
            render={() => <Robes robes={robes} />}
          />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors,
    robes: state.robes
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { fetchRobes }
  )(Main)
);
