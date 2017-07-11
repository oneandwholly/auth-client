import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class NewComment extends Component {
  constructor(props) {
    super(props);

    this.state = { term: "" };
  }

  render() {
    return (
      <div>
        <input
          value = {this.state.term}
          onChange={event => this.onInputChange(event.target.value)}
          onKeyPress={this._handleKeyPress} />
      </div>
    );
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.addComment({'comment_text': this.state.term, 'photo_id': this.props.id});
    }
  }

  // event handler method
  onInputChange(term) {
    this.setState({term});
  }
}

export default connect(null, actions)(NewComment);
