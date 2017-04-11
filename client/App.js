/**
 * App Component
 */

import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

// Import Routes
import routes from './routes';

export default function App(props) {
  return (
    <Provider store={props.store}>
      <Router history={props.history}>
        {routes}
      </Router>
    </Provider>
  );
}

App.propTypes = {
  store: React.PropTypes.object.isRequired,
};
