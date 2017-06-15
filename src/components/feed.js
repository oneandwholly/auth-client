import React, { Component } from 'react';
import { connect } from 'react-redux';

class Feed extends Component {

  renderCard(url) {
    console.log(url);
    return <div>
      <img src={url} />
    </div>;
  }

  render() {
    console.log('pcitures',this.props.pictures)
    return (
      <div>
        {this.props.pictures.map(this.renderCard)}
      </div>
    );
  }
}

function mapStateToProps({ pictures }) {
  return { pictures };
}

export default connect(mapStateToProps)(Feed);
