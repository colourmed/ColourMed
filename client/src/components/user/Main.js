import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRobes } from '../../store/actions/robes';
import '../../css/universal/Main.css';

import Robes from './Robes';
import Login from './Login';
import Error from '../universal/Error';

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
    const { errors } = this.props;

    const Root = () => <h1>ROOT</h1>;
    const Contact = () => <h1>Contact</h1>;
    const Cart = () => <h1>Cart</h1>;

    return (
      <div id="main">
        <Error error={errors} />

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
