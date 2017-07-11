import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import NewComment from './newComment';

class Card extends Component {


  render() {
    return <div>
      <img src={this.props.photo.img_url} />
      <NewComment id={this.props.photo.id} />
    </div>;
  }
}

export default connect(null, actions)(Card);
