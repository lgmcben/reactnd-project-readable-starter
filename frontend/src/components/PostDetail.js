import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import {  upVoteRequest, downVoteRequest, deletePostRequest, editPostRequest, fetchCommentsRequest, upVoteCommentRequest, downVoteCommentRequest, editCommentRequest, deleteCommentRequest } from '../actions'

// ben temp
import * as PostAPIUtil from '../utils/api';

class PostDetail extends Component{

    state = {
        editPostModalOpen: false,
        editCommentModalOpen: false
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

    openEditCommentModal = (id, body) => {
        this.setState({
            editCommentModalOpen: true,
            editCommentId: id,
            editCommentBody: body
        });
    }

    closeEditCommentModal = () => {
        this.setState({
            editCommentModalOpen: false,
            editCommentId: '',
            editCommentBody: ''
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

    _submitEditComment = (event) => {
        event.preventDefault();
        if (!this.state.editCommentBody) {
            return
        }
        this.props.dispatchEditComment({id: this.state.editCommentId, body: this.state.editCommentBody});
        this.closeEditCommentModal();
    }


    render() {
        const post = this.props.postList.find(post => post.id === this.props.match.params.post_id);

        const { editPostModalOpen, editCommentModalOpen } = this.state;
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
                    <hr/>

                    <p>COMMENTS :</p>

                    <div className="comment-container">
                    {this.props.comments && this.props.comments.map(comment =>
                        (
                            <div>

                                <p>{comment.body}</p>
                                <p>
                                    <i>author: {comment.author} |  score: {comment.voteScore}</i>
                                </p>
                                <button className='button-control' onClick={() => this.props.dispatchUpvoteComment(comment.id)}>
                                    + Upvote
                                </button>

                                <button className='button-control' onClick={() => this.props.dispatchDownvoteComment(comment.id)}>
                                    - Downvote
                                </button>

                                <button className='button-control' onClick={() => this.openEditCommentModal(comment.id, comment.body)}>
                                    Edit
                                </button>

                                <button className='button-control' onClick={() => this.props.dispatchDeleteComment(comment.id)}>
                                    Delete
                                </button>
                            </div>
                        )
                    )}
                    </div>



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

                    <Modal
                        isOpen={editCommentModalOpen}
                        onRequestClose={this.closeEditCommentModal}
                        contentLabel='EditCommentModal'
                    >
                        <div>
                            <h2>Edit comment</h2>
                            <input
                                type='text'
                                placeholder='Body...'
                                value={this.state.editCommentBody}
                                onChange={(event) => this.setState({editCommentBody: event.target.value})}
                            />
                            <br/>
                            <br/>
                            <button onClick={this._submitEditComment}>
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
        dispatchFetchComments: (data) => dispatch(fetchCommentsRequest(data)),
        dispatchUpvoteComment: (data) => dispatch(upVoteCommentRequest(data)),
        dispatchDownvoteComment: (data) => dispatch(downVoteCommentRequest(data)),
        dispatchEditComment: (data) => dispatch(editCommentRequest(data)),
        dispatchDeleteComment: (data) => dispatch(deleteCommentRequest(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
