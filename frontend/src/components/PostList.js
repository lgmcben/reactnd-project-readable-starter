import React, { Component } from 'react';
import fetchPostList from '../utils/api';

class PostList extends Component {

    componentDidMount() {
      fetchPostList().then(postList => {console.log(postList)} );
    }

    render() {
        return (
            <h1>Post list</h1>
        );
    }
}

export default PostList;