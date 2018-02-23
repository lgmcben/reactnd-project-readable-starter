import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadAllPosts, addNewPost } from '../actions'
import { fetchPostList, submitNewPost } from '../utils/api';
import Modal from 'react-modal'
import Loading from 'react-loading'

class PostList extends Component {

    state = {
        newPostModalOpen: false
    }

    openNewPostModal = () => {
        this.setState({
            newPostModalOpen: true
        });
    }

    closeNewPostModal = () => {
        this.setState({
            newPostModalOpen: false
        });
    }

    _submitNewPost = (event) => {
        if (!this.input.value) {
            return
        }
        event.preventDefault();
        submitNewPost()
        .then(newPost => {
            console.log('newPost', newPost)
            this.props.doAddNewPost(newPost);
        });
        this.closeNewPostModal();

    }

    componentDidMount() {
        Modal.setAppElement('body');
        fetchPostList().then(postList => {
            console.log('fetched postList = ', postList);
            this.props.doLoadAllPost(postList);
        });
    }

    render() {
        console.log('Props', this.props);
        const { newPostModalOpen } = this.state;
        return (
            <div>
                <div>
                    {this.props.postList.map(post =>
                        <ul>
                            <li className='post'>
                                <p key={post.id}>
                                    <strong>{post.title}</strong>
                                </p>
                                <p>
                                    <i>author: {post.author} | comments: {post.commentCount} | score: {post.voteScore}</i>
                                </p>

                                <button className='button-control'>
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
                        </ul>
                    )}
                </div>
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
                            ref={(input) => this.input = input}
                        />
                        <button onClick={this._submitNewPost}>
                            Submit
                        </button>

                    </div>

                </Modal>
            </div>
        );
    }
}

function mapStateToProps ({posts, comments}, ownProps) {
    return {
        postList: posts.postList
    }
}

function mapDispatchToProps (dispatch) {
    return {
        doLoadAllPost: (data) => dispatch(loadAllPosts(data)),
        doAddNewPost: (data) => dispatch(addNewPost(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
