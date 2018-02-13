import React, { Component } from 'react';

class PostList extends Component {

    componentDidMount() {
        // Get post list
      const postListUrl = `http://localhost:3001/posts`;
      fetch(postListUrl, {
        method: 'GET',
        headers: { 'Authorization': 'benkitti' }
      })
      .then((response) => response.json())
      .then((responseJson) => {
          console.log(responseJson);
      })
    }

    render() {
        return (
            <h1>Post list</h1>
        );
    }
}

export default PostList;