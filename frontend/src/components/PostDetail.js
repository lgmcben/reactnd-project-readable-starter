import React, { Component } from 'react';
import { connect } from 'react-redux';

class PostDetail extends Component{
    render() {
        const post = this.props.postList.find(post => post.id === this.props.match.params.post_id);
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

                <button className='button-control'>
                    Delete
                </button>
            </div>
        )
    }
}

function mapStateToProps ({post, comment, category}, ownProps) {
    return {
        postList: post.postList,
    }
}

function mapDispatchToProps (dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
