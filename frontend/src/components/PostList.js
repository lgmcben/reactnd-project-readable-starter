import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllPostsRequest, addNewPostRequest, fetchCategoriesRequest, upVoteRequest } from '../actions'
import Modal from 'react-modal'

import * as PostAPIUtil from '../utils/api';
//import Loading from 'react-loading'


class PostList extends Component {

    state = {
        newPostModalOpen: false,
        newPostTitle: '',
        newPostBody: '',
        newPostAuthor: '',
        newPostCategory: ''
    }

    openNewPostModal = () => {
        this.setState({
            newPostModalOpen: true
        });
    }

    closeNewPostModal = () => {
        this.setState({
            newPostModalOpen: false,
            newPostTitle: '',
            newPostBody: '',
            newPostAuthor: '',
            newPostCategory: ''
        });
    }

    _submitNewPost = (event) => {
        event.preventDefault();
        if (!this.state.newPostTitle) {
            return
        }
        console.log('selected category', this.state.newPostCategory);
        this.props.dispatchAddNewPost({title: this.state.newPostTitle, body: this.state.newPostBody, author: this.state.newPostAuthor, category: this.state.newPostCategory});
        this.closeNewPostModal();
    }

    componentDidMount() {
        Modal.setAppElement('body');
        this.props.dispatchLoadAllPost();
        this.props.dispatchFetchCategories();

    }

    render() {
        console.log('Props', this.props);
        const { newPostModalOpen } = this.state;
        return (
            <div>
                <ul>
                    {this.props.postList.map(post =>
                        <li className='post' key={post.id}>
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

                            <button className='button-control'>
                                - Downvote
                            </button>

                            <button className='button-control'>
                                Edit
                            </button>

                            <button className='button-control'>
                                Delete
                            </button>
                        </li>
                    )}
                </ul>
                <button onClick={() => this.openNewPostModal()}>New post</button>

                <Modal
                    isOpen={newPostModalOpen}
                    onRequestClose={this.closeNewPostModal}
                    contentLabel='Modal'
                >
                    <div>
                        <h2>Add new post</h2>
                        <input
                            type='text'
                            placeholder='Title...'
                            value={this.state.newPostTitle}
                            onChange={(event) => this.setState({newPostTitle: event.target.value})}
                        />
                        <br/>
                        <br/>
                        <input
                            type='text'
                            placeholder='Body...'
                            value={this.state.newPostBody}
                            onChange={(event) => this.setState({newPostBody: event.target.value})}
                        />
                        <br/>
                        <br/>
                        <input
                            type='text'
                            placeholder='Author...'
                            value={this.state.newPostAuthor}
                            onChange={(event) => this.setState({newPostAuthor: event.target.value})}
                        />
                        <br/>
                        <br/>
                        <select value={this.state.newPostCategory} onChange={(event) => this.setState({newPostCategory: event.target.value})}>
                            <option default>Select category</option>

                            {this.props.categoryList && this.props.categoryList.map(category =>
                                <option key={category.path} value={category.name}>{category.name}</option>
                            )}
                        </select>
                        <button onClick={this._submitNewPost}>
                            Submit
                        </button>

                    </div>

                </Modal>
            </div>
        );
    }
}

function mapStateToProps ({post, comment, category}, ownProps) {
    return {
        postList: post.postList,
        categoryList: category.categories
    }
}

function mapDispatchToProps (dispatch) {
    return {
        dispatchLoadAllPost: (data) => dispatch(fetchAllPostsRequest(data)),
        dispatchAddNewPost: (data) => dispatch(addNewPostRequest(data)),
        dispatchFetchCategories: (data) => dispatch(fetchCategoriesRequest(data)),
        dispatchUpvote: (data) => dispatch(upVoteRequest(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
