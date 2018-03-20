import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { upVoteRequest,
         downVoteRequest,
         deletePostRequest,
         editPostRequest } from '../actions'

class Post extends Component {
    render() {
        return (
            <li className='post'>
                <p>
                    <Link to={`/${this.props.post.category}/${this.props.post.id}`}>
                        <strong>{this.props.post.title}</strong>
                    </Link>
                </p>
                <p>
                    <i>author: {this.props.post.author} | comments: {this.props.post.commentCount} | score: {this.props.post.voteScore}</i>
                </p>

                <button className='button-control' onClick={() => this.props.dispatchUpvote(this.props.post.id)}>
                    + Upvote
                </button>

                <button className='button-control' onClick={() => this.props.dispatchDownvote(this.props.post.id)}>
                    - Downvote
                </button>

                <button className='button-control' onClick={() => this.openEditPostModal(this.props.post.id, this.props.post.title, this.props.post.body)}>
                    Edit
                </button>

                <button className='button-control' onClick={ () => this.props.dispatchDeletePost(this.props.post.id) }>
                    Delete
                </button>
            </li>
        )
    }
}

function mapDispatchToProps (dispatch) {
    return {
        dispatchUpvote: (data) => dispatch(upVoteRequest(data)),
        dispatchDownvote: (data) => dispatch(downVoteRequest(data)),
        dispatchDeletePost: (data) => dispatch(deletePostRequest(data)),
        dispatchEditPost: (data) => dispatch(editPostRequest(data)),
    }
}

export default connect(null, mapDispatchToProps)(Post);
