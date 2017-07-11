import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Card from './card';

class Feed extends Component {

  componentWillMount() {
    this.renderCard = this.renderCard.bind(this);
    this.props.fetchPhoto();
  }

  renderCard(photo) {
    return <Card photo={photo} key={photo.id} />
  }

  render() {
    return (
      <div>
        {this.props.photos.map(this.renderCard)}
      </div>
    );
  }
}

function mapStateToProps({ photos }) {
  return { photos };
}

export default connect(mapStateToProps, actions)(Feed);
