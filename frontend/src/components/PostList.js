import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadAllPosts } from '../actions'
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
        submitNewPost();
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
                    {this.props.postList.map(post => <p key={post.id}>{post.title}</p>)}
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
        doLoadAllPost: (data) => dispatch(loadAllPosts(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
