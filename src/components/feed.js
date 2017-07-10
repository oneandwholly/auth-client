import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feed extends Component {

  componentWillMount() {
    this.props.fetchPhoto();
  }

  renderCard(photo) {
    return <div>
      <img src={photo} />
    </div>;
  }

  render() {
    return (
      <div>
        {}
      </div>
    );
  }
}

function mapStateToProps({ photos }) {
  return { photos };
}

export default connect(mapStateToProps, actions)(Feed);
