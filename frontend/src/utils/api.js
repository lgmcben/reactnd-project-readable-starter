function fetchPostList () {
    const postListUrl = `http://localhost:3001/posts`;
    return fetch(postListUrl, {
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
    const postListUrl = `http://localhost:3001/categories`;
    return fetch(postListUrl, {
                method: 'GET',
                headers: {
                    'Authorization': 'benkittitoken',
                    'Content-Type': 'application/json'
                },
           })
           .then((response) => response.json())
           .then((responseJson) => responseJson.categories);
}

function submitNewPost ({title = '', body = '', author = '', category = ''} = {}) {
    const uuidv1 = require('uuid/v1');
    const url = 'http://localhost:3001/posts';
    const postBody = JSON.stringify({
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
                body: postBody
           })
           .then((response) => {
                console.log(response);
                return response.json();
            })
           .then((responseJson) => {
                console.log(responseJson);
                return responseJson;
           });
}

function vote ({id = undefined, option = ''} = {}) {
    const url = `http://localhost:3001/posts/${id}`;
    const postBody = JSON.stringify({
       option: option
    })
    return fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': 'benkittitoken',
                    'Content-Type': 'application/json'
                },
                body: postBody
           })
           .then((response) => {
                console.log(response);
                return response.json();
            })
           .then((responseJson) => {
                console.log('vote(), responseJson = ', responseJson);
                return responseJson;
           });
}

const UPVOTE = 'upVote';
const DOWNVOTE = 'downVote';

export {
    fetchPostList,
    submitNewPost,
    fetchCategories,
    vote,
    UPVOTE,
    DOWNVOTE
}