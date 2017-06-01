import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Router, Route, Link, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import reducers from './reducers';
import history from './history';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
        <Router history={history}>
            <App />
        </Router>
  </Provider>
  , document.querySelector('.container'));
