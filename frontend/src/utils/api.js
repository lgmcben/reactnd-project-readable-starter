function fetchPostList () {
    const postListUrl = `http://localhost:3001/posts`;
    return fetch(postListUrl, {
                method: 'GET',
                headers: {
                    'Authorization': 'kittiben',
                    'Content-Type': 'application/json'
                },
           })
           .then((response) => response.json())
           .then((postList) => postList);
}

function submitNewPost () {
    const uuidv1 = require('uuid/v1');
    const url = 'http://localhost:3001/posts';
    let postBody = JSON.stringify({
       id: uuidv1(),
       timestamp: Date.now(),
       title: 'testTitle',
       body: 'testBody',
       author: 'ben',
       category: 'udacity'
     })
    return fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': 'kittiben',
                    'Content-Type': 'application/json'
                },
                body: postBody
           })
           .then((response) => {
                console.log(response)
                return response.json()
            })
           .then((responseJson) => { console.log(responseJson) });
}

export {
    fetchPostList,
    submitNewPost
}