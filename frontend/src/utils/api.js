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

function fetchComments (postId) {
    const commentsUrl = `${SERVER_URL}/posts/${postId}/comments`;
    return fetch(commentsUrl, {
      method: 'GET',
      headers: {
          'Authorization': 'benkittitoken',
          'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(responseJson => {
      console.log('fetchComments', responseJson);
      return responseJson;
    });
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
         .then((response) => {
              console.log(response);
              return response.json();
          })
         .then((responseJson) => {
              console.log('vote(), responseJson = ', responseJson);
              return responseJson;
         });
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
         .then((response) => {
              console.log(response);
              return response.json();
          })
         .then((responseJson) => {
              console.log('voteComment(), responseJson = ', responseJson);
              return responseJson;
         });
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
           .then((response) => {
                console.log(response);
                return response.json();
            })
           .then((responseJson) => {
                console.log('editPost(), responseJson = ', responseJson);
                return responseJson;
           });
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
           .then((response) => {
                console.log(response);
                return response.json();
            })
           .then((responseJson) => {
                console.log('editComment(), responseJson = ', responseJson);
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
    editPost,
    deletePost,
    fetchComments,
    voteComment,
    editComment,
    UPVOTE,
    DOWNVOTE
}