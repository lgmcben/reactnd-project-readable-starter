import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadAllPosts } from '../actions'
import fetchPostList from '../utils/api';
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
                {this.props.postList.map(post => <p key={post.id}>{post.title}</p>)}
                <button onClick={() => this.openNewPostModal()}>New post</button>

                <Modal
                    isOpen={newPostModalOpen}
                    onRequestClose={this.closeNewPostModal}
                    contentLabel='Modal'
                >

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
