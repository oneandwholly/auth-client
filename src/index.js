import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter, Router, Route, Link, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import reducers from './reducers';
import history from './history';
import { AUTH_USER } from './actions/types';

// const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
// const store = createStoreWithMiddleware(reducers);

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(reduxThunk)
));

const token = localStorage.getItem('token');

if (token) {
    store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
  </Provider>
  , document.querySelector('.container'));
