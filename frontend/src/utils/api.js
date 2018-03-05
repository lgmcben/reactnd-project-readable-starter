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

function submitNewPost ({title = '', body = '', author = ''} = {}) {
    const uuidv1 = require('uuid/v1');
    const url = 'http://localhost:3001/posts';
    let postBody = JSON.stringify({
       id: uuidv1(),
       timestamp: Date.now(),
       title: title,
       body: body,
       author: author,
       category: 'udacity'
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

export {
    fetchPostList,
    submitNewPost
}