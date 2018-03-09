import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import {  upVoteRequest, downVoteRequest, deletePostRequest } from '../actions'

class PostDetail extends Component{
    render() {
        const post = this.props.postList.find(post => post.id === this.props.match.params.post_id);
        if(post && !post.deleted){
            return(
                <div>
                    <p>
                        <strong>{post.title}</strong>
                    </p>
                    <p>
                        {post.body}
                    </p>
                    <p>
                        <i>author: {post.author} | comments: {post.commentCount} | score: {post.voteScore}</i>
                    </p>

                    <button className='button-control' onClick={() => this.props.dispatchUpvote(post.id)}>
                        + Upvote
                    </button>

                    <button className='button-control' onClick={() => this.props.dispatchDownvote(post.id)}>
                        - Downvote
                    </button>

                    <button className='button-control'>
                        Edit
                    </button>

                    <button className='button-control' onClick={() => this.props.dispatchDeletePost(post.id)}>
                        Delete
                    </button>
                </div>
            )
        } else if (!post){
            return (
                <div>
                    <p>404 post not found or is deleted</p>
                    <Link to="/">Back to post list</Link>
                </div>
            )
        }

    }
}

function mapStateToProps ({post, comment, category}, ownProps) {
    return {
        postList: post.postList,
    }
}

function mapDispatchToProps (dispatch) {
    return {
        dispatchUpvote: (data) => dispatch(upVoteRequest(data)),
        dispatchDownvote: (data) => dispatch(downVoteRequest(data)),
        dispatchDeletePost: (data) => dispatch(deletePostRequest(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
