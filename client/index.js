import 'babel-polyfill';
import 'rxjs';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import { store } from './store';

import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// Initialize store
const mountApp = document.getElementById('root');
// const store = store(window.__INITIAL_STATE__);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <AppContainer>
    <App store={store} history={history}/>
  </AppContainer>,
  mountApp
);

// For hot reloading of react components
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(
      <AppContainer>
        <NextApp store={store} history={history}/>
      </AppContainer>,
      mountApp
    );
  });
}
