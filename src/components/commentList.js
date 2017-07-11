import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CommentList extends Component {

  componentWillMount() {
    this.props.fetchCommentByPhotoId({photo_id: this.props.id});
    console.log('id', this.props.id)
    console.log('mounting comments.id', this.props.comments);
  }

  renderComments() {
    if(this.props.comments[this.props.id]) {
      return this.props.comments[this.props.id].map((comment) => {
        return <li key={comment.id}>{comment.comment_text}</li>
      })
    }
    return [];
  }

  render() {
    return <div>
      {this.renderComments()}
    </div>;
  }
}

function mapStateToProps({ comments }) {
  return { comments };
}

export default connect(mapStateToProps, actions)(CommentList);
