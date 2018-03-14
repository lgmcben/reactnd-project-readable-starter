import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import {  upVoteRequest, downVoteRequest, deletePostRequest, editPostRequest, fetchCommentsRequest } from '../actions'

// ben temp
import * as PostAPIUtil from '../utils/api';

class PostDetail extends Component{

    state = {
        editPostModalOpen: false
    }

    componentDidMount() {
        this.props.dispatchFetchComments(this.props.match.params.post_id);
    }

    openEditPostModal = (id, title, body) => {
        this.setState({
            editPostModalOpen: true,
            editPostId: id,
            editPostTitle: title,
            editPostBody: body
        });
    }

    closeEditPostModal = () => {
        this.setState({
            editPostModalOpen: false,
            editPostId: '',
            editPostTitle: '',
            editPostBody: ''
        });
    }

    _submitEditPost = (event) => {
        event.preventDefault();
        if (!this.state.editPostTitle) {
            return
        }
        this.props.dispatchEditPost({id: this.state.editPostId, title: this.state.editPostTitle, body: this.state.editPostBody});
        this.closeEditPostModal();
    }

    render() {
        const post = this.props.postList.find(post => post.id === this.props.match.params.post_id);

        const { editPostModalOpen } = this.state;
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

                    <button className='button-control' onClick={() => this.openEditPostModal(post.id, post.title, post.body)}>
                        Edit
                    </button>

                    <button className='button-control' onClick={() => this.props.dispatchDeletePost(post.id)}>
                        Delete
                    </button>

                    <br/>

                    {this.props.comments && this.props.comments.map(comment => <p>{comment.body}</p>)}



                    <Modal
                        isOpen={editPostModalOpen}
                        onRequestClose={this.closeEditPostModal}
                        contentLabel='EditPostModal'
                    >
                        <div>
                            <h2>Edit post</h2>
                            <input
                                type='text'
                                placeholder='Title...'
                                value={this.state.editPostTitle}
                                onChange={(event) => this.setState({editPostTitle: event.target.value})}
                            />
                            <br/>
                            <br/>
                            <input
                                type='text'
                                placeholder='Body...'
                                value={this.state.editPostBody}
                                onChange={(event) => this.setState({editPostBody: event.target.value})}
                            />
                            <br/>
                            <br/>
                            <button onClick={this._submitEditPost}>
                                Submit
                            </button>

                        </div>

                    </Modal>
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
        comments: comment.comments
    }
}

function mapDispatchToProps (dispatch) {
    return {
        dispatchUpvote: (data) => dispatch(upVoteRequest(data)),
        dispatchDownvote: (data) => dispatch(downVoteRequest(data)),
        dispatchDeletePost: (data) => dispatch(deletePostRequest(data)),
        dispatchEditPost: (data) => dispatch(editPostRequest(data)),
        dispatchFetchComments: (data) => dispatch(fetchCommentsRequest(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
