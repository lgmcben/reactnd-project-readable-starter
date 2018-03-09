const UPVOTE = 'upVote';
const DOWNVOTE = 'downVote';
const SERVER_URL = 'http://localhost:3001';

function fetchPostList () {
    const postListUrl = `${SERVER_URL}/posts`;
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
    const postListUrl = `${SERVER_URL}/categories`;
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
    const url = `${SERVER_URL}/posts`;
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
  const url = `${SERVER_URL}/posts/${id}`;
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

function deletePost (id) {
  const url = `${SERVER_URL}/posts/${id}`;
  return fetch(url, {
              method: 'DELETE',
              headers: {
                  'Authorization': 'benkittitoken',
                  'Content-Type': 'application/json'
              }
         })
         .then((response) => {
              console.log(response);
              return response.json();
          })
         .then((responseJson) => {
              console.log('deletePost(), responseJson = ', responseJson);
              return responseJson;
         });
}



export {
    fetchPostList,
    submitNewPost,
    fetchCategories,
    vote,
    deletePost,
    UPVOTE,
    DOWNVOTE
}