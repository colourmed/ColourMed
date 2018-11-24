import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRobes, editRobe, removeRobe } from '../../store/actions/robes';
import { fetchFeatured, removeFromFeatured } from '../../store/actions/featured';
import { addError, removeError } from '../../store/actions/errors';
import { addSuccess, removeSuccess } from '../../store/actions/success';
import '../../css/universal/Main.css';

import Featured from './Featured';
import NewProduct from './NewProduct';
import Robes from '../universal/Robes';
import Error from '../universal/Error';
import Success from '../universal/Success';

class Main extends Component {
  componentWillMount() {
    this.props.fetchRobes();
  }

  render() {
    const {
      history,
      errors,
      addError,
      removeError,
      success,
      addSuccess,
      removeSuccess,
      editRobe,
      removeRobe,
      robes,
      removeFromFeatured,
      fetchFeatured,
      featured
    } = this.props;

    const Root = () => <h1>ROOT</h1>;

    return (
      <div id="main">
        <Error error={errors} />
        <Success success={success} />

        <Switch>
          <Route exact path="/admin" component={Root} />

          <Route
            exact
            path="/admin/products"
            render={() => (
              <Robes
                robes={robes}
                showAdminControls={true}
                editRobe={editRobe}
                removeRobe={removeRobe}
                history={history}
                removeError={removeError}
                removeSuccess={removeSuccess}
                addError={addError}
              />
            )}
          />

          <Route
            exact
            path="/admin/featured"
            render={() => (
              <Featured
                addError={addError}
                addSuccess={addSuccess}
                history={history}
                removeError={removeError}
                removeSuccess={removeSuccess}
                fetchFeatured={fetchFeatured}
                removeFromFeatured={removeFromFeatured}
                featured={featured}
                robes={robes}
              />
            )}
          />

          <Route
            exact
            path="/admin/new"
            render={() => (
              <NewProduct
                addError={addError}
                addSuccess={addSuccess}
                history={history}
                removeError={removeError}
                removeSuccess={removeSuccess}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors,
    success: state.success,
    robes: state.robes,
    featured: state.featured
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    {
      fetchRobes,
      addError,
      removeError,
      addSuccess,
      removeSuccess,
      editRobe,
      removeRobe,
      fetchFeatured,
      removeFromFeatured
    }
  )(Main)
);
