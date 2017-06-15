import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Feed from './feed';

class Home extends Component {
  render() {
    return (
      <div>
        <Link to='/add' >+</Link>
        <Feed />
      </div>
    );
  }
}

export default Home;
