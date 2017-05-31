import React, { Component } from 'react';
import Header from './header';
import { Switch, Route } from 'react-router-dom';
import Signin from './auth/signin';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route path="/signin" component={Signin} />
      </div>
    );
  }
}
