import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { middleware as apiMiddleware } from 'redux-api-call';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import rootEpic from './rootEpics/rootEpic';
import loginEpic from './rootEpics/loginEpic';

import { persistStore, autoRehydrate } from 'redux-persist';
import rootReducer from './reducers';

const epics = combineEpics(
  rootEpic,
  loginEpic
);
const epicMiddleware = createEpicMiddleware(epics);

export function configureStore(initialState = {}) {
  const enhancers = [
    applyMiddleware(
      thunk,
      apiMiddleware(({ endpoint, ...others }) => fetch(endpoint, others)
        .then(res => Promise.resolve({
          ok: res.ok,
          json() {
            return res.json().then(
              json => json,
              err => new Error(`Error when parsing ${err}`)
            );
          },
        }))),
      epicMiddleware),
    //DevTools.instrument(),
  ];
  
  if (process.env.CLIENT && process.env.NODE_ENV === 'development') {
    // Enable DevTools only when rendering on client and during development.
    // enhancers.push(window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument());
    enhancers.push(window.devToolsExtension());
  }
  
  const store = createStore(rootReducer, initialState, compose(...enhancers, autoRehydrate()));
  const presitor = persistStore(store, { blacklist: ['routing', 'AppReducer'] });
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default;
      store.replaceReducer(nextReducer);
    });
    module.hot.accept('./rootEpics/rootEpic', () => {
      const nextRootEpic = require('./rootEpics/rootEpic').default;
      epicMiddleware.replaceEpic(nextRootEpic);
    });
  }
  
  return store;
}
