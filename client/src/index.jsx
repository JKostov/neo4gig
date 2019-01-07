/* es-lint disable */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import './loader';
import reducers from './reducers';
import Routes from './routes';
import './global.scss';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const history = createHistory();
const store = createStoreWithMiddleware(reducers);
const persisted = persistStore(store);

// To ease debugging.
if (process.env.NODE_ENV === 'development') {
  window.store = store;
}

if (module.hot) {
  module.hot.accept();
}

const AppWrapper = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persisted}>
      <Router history={history}>
        <Routes />
      </Router>
    </PersistGate>
  </Provider>
);

const mountNode = document.getElementById('app');
ReactDOM.render(<AppWrapper />, mountNode);
