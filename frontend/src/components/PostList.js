import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllPosts, addNewPostRequest } from '../actions'
import Modal from 'react-modal'
//import Loading from 'react-loading'

class PostList extends Component {

    state = {
        newPostModalOpen: false,
        newPostTitle: ''
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
        event.preventDefault();
        if (!this.state.newPostTitle) {
            return
        }
        this.props.dispatchAddNewPost(this.state.newPostTitle);
        this.closeNewPostModal();

    }

    componentDidMount() {
        Modal.setAppElement('body');
        this.props.dispatchLoadAllPost();

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
        dispatchLoadAllPost: (data) => dispatch(fetchAllPosts(data)),
        dispatchAddNewPost: (data) => dispatch(addNewPostRequest(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
