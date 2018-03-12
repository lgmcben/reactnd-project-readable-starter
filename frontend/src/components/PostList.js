import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import { fetchAllPostsRequest,
         addNewPostRequest,
         fetchCategoriesRequest,
         upVoteRequest,
         downVoteRequest,
         deletePostRequest,
         editPostRequest,
         sortByScoreAsc,
         sortByScoreDesc } from '../actions'


import * as PostAPIUtil from '../utils/api';
//import Loading from 'react-loading'


class PostList extends Component {

    state = {
        newPostModalOpen: false,
        editPostModalOpen: false,
        newPostTitle: '',
        newPostBody: '',
        newPostAuthor: '',
        newPostCategory: ''
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
        //console.log('selected category', this.state.newPostCategory);
        this.props.dispatchAddNewPost({title: this.state.newPostTitle, body: this.state.newPostBody, author: this.state.newPostAuthor, category: this.state.newPostCategory});
        this.closeNewPostModal();
    }

    _submitEditPost = (event) => {
        event.preventDefault();
        if (!this.state.editPostTitle) {
            return
        }
        this.props.dispatchEditPost({id: this.state.editPostId, title: this.state.editPostTitle, body: this.state.editPostBody});
        this.closeEditPostModal();
    }

    componentDidMount() {
        Modal.setAppElement('body');
        this.props.dispatchLoadAllPost();
        this.props.dispatchFetchCategories();
    }

    render() {
        console.log('Props', this.props);
        const { newPostModalOpen, editPostModalOpen } = this.state;
        return (
            <div>

                <span>Categories: </span>
                <span>
                    <Link to={`/`}>
                        All
                    </Link>
                    &nbsp;
                    &nbsp;
                </span>
                {this.props.categoryList && this.props.categoryList.map(category =>
                    <span key={category.path}>
                        <Link to={`/${category.path}`}>
                            {category.name}
                        </Link>
                        &nbsp;
                        &nbsp;
                    </span>
                )}

                <span>
                    <button className='button-control' onClick={() => this.props.dispatchSortByScoreAsc()}>
                        Sort by score ascending
                    </button>
                    <button className='button-control' onClick={() => this.props.dispatchSortByScoreDesc()}>
                        Sort by score descending
                    </button>
                </span>

                <br/>
                <hr/>
                <br/>

                <ul>
                    {this.props.postList.filter(post => {
                        if(this.props.match.params.category){
                            return post.category === this.props.match.params.category;
                        }else{
                            return true;
                        }
                    }).map(post =>

                            <li className='post' key={post.id}>
                                <p>
                                    <Link to={`/${post.category}/${post.id}`}>
                                        <strong>{post.title}</strong>
                                    </Link>
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

                                <button className='button-control' onClick={ () => this.props.dispatchDeletePost(post.id) }>
                                    Delete
                                </button>
                            </li>

                    )}
                </ul>
                <button onClick={() => this.openNewPostModal()}>New post</button>

                <Modal
                    isOpen={newPostModalOpen}
                    onRequestClose={this.closeNewPostModal}
                    contentLabel='NewPostModal'
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
        dispatchUpvote: (data) => dispatch(upVoteRequest(data)),
        dispatchDownvote: (data) => dispatch(downVoteRequest(data)),
        dispatchDeletePost: (data) => dispatch(deletePostRequest(data)),
        dispatchEditPost: (data) => dispatch(editPostRequest(data)),
        dispatchSortByScoreAsc: () => dispatch(sortByScoreAsc()),
        dispatchSortByScoreDesc: () => dispatch(sortByScoreDesc()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
