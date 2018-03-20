import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import {  addNewCommentRequest,
          deletePostRequest,
          downVoteRequest,
          editCommentRequest,
          editPostRequest,
          fetchCommentsRequest,
          fetchSinglePostRequest,
          upVoteRequest } from '../actions';

import Comment from './Comment';
import Post from './Post';

class PostDetail extends Component{
    state = {
        editCommentModalOpen: false,
        editPostModalOpen: false,
        newCommentModalOpen: false
    }

    componentDidMount() {
        this.props.dispatchFetchSinglePost(this.props.match.params.post_id);
        this.props.dispatchFetchComments(this.props.match.params.post_id);
    }

    openEditPostModal = (id, title, body) => {
        this.setState({
            editPostModalOpen: true,
            editPostId: id,
            editPostTitle: title,
            editPostBody: body,
            warning: '' // Minimum form validation: display simple warning when one or more fields are missing
        });
    }

    closeEditPostModal = () => {
        this.setState({
            editPostModalOpen: false,
            editPostId: '',
            editPostTitle: '',
            editPostBody: '',
            warning: ''
        });
    }

    openNewCommentModal = () => {
        this.setState({
            newCommentModalOpen: true,
            warning: ''
        });
    }

    closeNewCommentModal = () => {
        this.setState({
            newCommentModalOpen: false,
            newCommentBody: '',
            newCommentAuthor: '',
            warning: ''
        });
    }

    openEditCommentModal = (id, body) => {
        this.setState({
            editCommentModalOpen: true,
            editCommentId: id,
            editCommentBody: body,
            warning: ''
        });
    }

    closeEditCommentModal = () => {
        this.setState({
            editCommentModalOpen: false,
            editCommentId: '',
            editCommentBody: '',
            warning: ''
        });
    }

    _submitNewComment = (event) => {
        event.preventDefault();
        if (!this.state.newCommentBody || !this.state.newCommentAuthor) {
            this.setState({ warning: 'Invalid input. Please try again.'});
            return
        }
        this.props.dispatchAddNewComment({ body: this.state.newCommentBody, author: this.state.newCommentAuthor, parentId: this.props.match.params.post_id });
        this.closeNewCommentModal();
    }

    _submitEditPost = (event) => {
        event.preventDefault();
        if (!this.state.editPostTitle || !this.state.editPostBody) {
            this.setState({ warning: 'Invalid input. Please try again.'});
            return
        }
        this.props.dispatchEditPost({id: this.state.editPostId, title: this.state.editPostTitle, body: this.state.editPostBody});
        this.closeEditPostModal();
    }

    _submitEditComment = (event) => {
        event.preventDefault();
        if (!this.state.editCommentBody) {
            this.setState({ warning: 'Invalid input. Please try again.'});
            return
        }
        this.props.dispatchEditComment({id: this.state.editCommentId, body: this.state.editCommentBody});
        this.closeEditCommentModal();
    }

    navigateBack = () => {
        this.props.history.goBack()
    }


    render() {
        // I first went with this approach: finding a post from existing postList in redux store. Then changed to fetching single post.
        // So that this PostDetail component won't rely on postList data
        // Thus I'll leave this commented line of code here for reference:
        // const post = this.props.postList.find(post => post.id === this.props.match.params.post_id);

        const post = this.props.postDetail;
        const { editPostModalOpen, editCommentModalOpen, newCommentModalOpen } = this.state;
        if(post && !post.deleted){
            return(
                <div>
                    <button onClick={this.navigateBack}>
                        Back
                    </button>

                    <Post post={post} showBody={true} />

                    <br/>
                    <hr/>

                    <p>COMMENTS :</p>

                    <div className='comment-container'>
                    {this.props.comments && this.props.comments.map(comment =>
                        (
                            <Comment comment={comment} openEditCommentModal={this.openEditCommentModal}/>
                        )
                    )}
                    </div>

                    <hr/>
                    <br/>

                    <button onClick={() => this.openNewCommentModal()}>New comment</button>

                    <Modal
                        isOpen={newCommentModalOpen}
                        onRequestClose={this.closeNewCommentModal}
                        contentLabel='NewCommentModal'
                    >
                        <div>
                            <h2>Add new comment</h2>
                            <input
                                type='text'
                                placeholder='Body...'
                                value={this.state.newCommentBody}
                                onChange={(event) => this.setState({newCommentBody: event.target.value})}
                            />
                            <br/>
                            <br/>
                            <input
                                type='text'
                                placeholder='Author...'
                                value={this.state.newCommentAuthor}
                                onChange={(event) => this.setState({newCommentAuthor: event.target.value})}
                            />
                            <br/>
                            <button onClick={this._submitNewComment}>
                                Submit
                            </button>

                            {this.state.warning && <p className='warning'>{this.state.warning}</p>}
                        </div>
                    </Modal>

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

                            {this.state.warning && <p className='warning'>{this.state.warning}</p>}
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

                            {this.state.warning && <p className='warning'>{this.state.warning}</p>}
                        </div>
                    </Modal>
                </div>
            )
        } else if (!post){
            return (
                <div>
                    <p>404 post not found or is deleted</p>
                    <Link to='/'>Back to post list</Link>
                </div>
            )
        }
    }
}

function mapStateToProps ({post, comment, category}, ownProps) {
    return {
        postList: post.postList,
        postDetail: post.postDetail,
        comments: comment.comments
    }
}

function mapDispatchToProps (dispatch) {
    return {
        dispatchFetchSinglePost: (data) => dispatch(fetchSinglePostRequest(data)),
        dispatchUpvote: (data) => dispatch(upVoteRequest(data)),
        dispatchDownvote: (data) => dispatch(downVoteRequest(data)),
        dispatchDeletePost: (data) => dispatch(deletePostRequest(data)),
        dispatchEditPost: (data) => dispatch(editPostRequest(data)),
        dispatchFetchComments: (data) => dispatch(fetchCommentsRequest(data)),
        dispatchEditComment: (data) => dispatch(editCommentRequest(data)),
        dispatchAddNewComment: (data) => dispatch(addNewCommentRequest(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
