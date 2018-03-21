const UPVOTE = 'upVote';
const DOWNVOTE = 'downVote';
const SERVER_URL = 'http://localhost:3001';

function fetchPost (id) {
    const url = `${SERVER_URL}/posts/${id}`;
    return fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': 'benkittitoken',
                    'Content-Type': 'application/json'
                },
           })
           .then((response) => response.json())
           .then((post) => post);
}

function fetchPostList () {
    const url = `${SERVER_URL}/posts`;
    return fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': 'benkittitoken',
                    'Content-Type': 'application/json'
                },
           })
           .then((response) => response.json())
           .then((postList) => postList);
}

function fetchCategories () {
    const url = `${SERVER_URL}/categories`;
    return fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': 'benkittitoken',
                    'Content-Type': 'application/json'
                },
           })
           .then((response) => response.json())
           .then((responseJson) => responseJson.categories);
}

function fetchComments (postId) {
    const url = `${SERVER_URL}/posts/${postId}/comments`;
    return fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': 'benkittitoken',
          'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(responseJson => responseJson);
}

function submitNewPost ({title = '', body = '', author = '', category = ''} = {}) {
    const uuidv1 = require('uuid/v1');
    const url = `${SERVER_URL}/posts`;
    const requestBody = JSON.stringify({
       id: uuidv1(),
       timestamp: Date.now(),
       title: title,
       body: body,
       author: author,
       category: category
    })
    return fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': 'benkittitoken',
                    'Content-Type': 'application/json'
                },
                body: requestBody
           })
           .then((response) => response.json())
           .then((responseJson) => responseJson);
}

function submitNewComment ({body = '', author = '', parentId = ''} = {}) {
    const uuidv1 = require('uuid/v1');
    const url = `${SERVER_URL}/comments`;
    const requestBody = JSON.stringify({
       id: uuidv1(),
       timestamp: Date.now(),
       body: body,
       author: author,
       parentId : parentId
    })
    return fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': 'benkittitoken',
                    'Content-Type': 'application/json'
                },
                body: requestBody
           })
           .then((response) => response.json())
           .then((responseJson) => responseJson);
}

function vote ({id = undefined, option = ''} = {}) {
    const url = `${SERVER_URL}/posts/${id}`;
    const requestBody = JSON.stringify({
       option: option
    })
    return fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': 'benkittitoken',
                    'Content-Type': 'application/json'
                },
                body: requestBody
           })
           .then((response) => response.json())
           .then((responseJson) => responseJson);
}

function voteComment ({id = undefined, option = ''} = {}) {
    const url = `${SERVER_URL}/comments/${id}`;
    const requestBody = JSON.stringify({
       option: option
    })
    return fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': 'benkittitoken',
                    'Content-Type': 'application/json'
                },
                body: requestBody
           })
           .then((response) => response.json())
           .then((responseJson) => responseJson);
}

function editPost ({id='', title = '', body = ''} = {}) {
    const url = `${SERVER_URL}/posts/${id}`;
    const requestBody = JSON.stringify({
       title: title,
       body: body
    })
    return fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': 'benkittitoken',
                    'Content-Type': 'application/json'
                },
                body: requestBody
           })
           .then((response) => response.json())
           .then((responseJson) => responseJson);
}

function editComment ({id='', timestamp, body = ''} = {}) {
    const url = `${SERVER_URL}/comments/${id}`;
    const requestBody = JSON.stringify({
       timestamp: Date.now(),
       body: body
    })
    return fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': 'benkittitoken',
                    'Content-Type': 'application/json'
                },
                body: requestBody
           })
           .then((response) => response.json())
           .then((responseJson) => responseJson);
}

function deletePost (id) {
    const url = `${SERVER_URL}/posts/${id}`;
    return fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'benkittitoken',
                    'Content-Type': 'application/json'
                }
           })
           .then((response) => response.json())
           .then((responseJson) => responseJson);
}

function deleteComment (id) {
    const url = `${SERVER_URL}/comments/${id}`;
    return fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'benkittitoken',
                    'Content-Type': 'application/json'
                }
           })
           .then((response) => response.json())
           .then((responseJson) => responseJson);
}

export {
    deleteComment,
    deletePost,
    editComment,
    editPost,
    fetchCategories,
    fetchComments,
    fetchPost,
    fetchPostList,
    submitNewComment,
    submitNewPost,
    vote,
    voteComment,
    UPVOTE,
    DOWNVOTE
}
