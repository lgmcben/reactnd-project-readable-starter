import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadAllPosts } from '../actions'
import fetchPostList from '../utils/api';

class PostList extends Component {

    componentDidMount() {

        fetchPostList().then(postList => {
            console.log('fetched postList = ', postList);
            this.props.doLoadAllPost(postList);
        });
    }

    render() {
        console.log('Props', this.props);
        return (
            this.props.postList.map(post => <h1 key={post.id}>{post.title}</h1>)

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
