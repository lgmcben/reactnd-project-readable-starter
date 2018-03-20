import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  deleteCommentRequest,
          downVoteCommentRequest,
          upVoteCommentRequest } from '../actions';

class Comment extends Component {
    render() {
        return (
            <div>
                <p>
                    {this.props.comment.body}
                </p>

                <p>
                    <i>author: {this.props.comment.author} |  score: {this.props.comment.voteScore}</i>
                </p>

                <button className='button-control' onClick={() => this.props.dispatchUpvoteComment(this.props.comment.id)}>
                    + Upvote
                </button>

                <button className='button-control' onClick={() => this.props.dispatchDownvoteComment(this.props.comment.id)}>
                    - Downvote
                </button>

                <button className='button-control' onClick={() => this.props.openEditCommentModal(this.props.comment.id, this.props.comment.body)}>
                    Edit
                </button>

                <button className='button-control' onClick={() => this.props.dispatchDeleteComment(this.props.comment.id)}>
                    Delete
                </button>
            </div>
        )
    }
}

function mapDispatchToProps (dispatch) {
    return {
        dispatchUpvoteComment: (data) => dispatch(upVoteCommentRequest(data)),
        dispatchDownvoteComment: (data) => dispatch(downVoteCommentRequest(data)),
        dispatchDeleteComment: (data) => dispatch(deleteCommentRequest(data)),
    }
}

export default connect(null, mapDispatchToProps)(Comment);
