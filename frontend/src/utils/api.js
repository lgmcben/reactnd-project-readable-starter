function fetchPostList () {
    const postListUrl = `http://localhost:3001/posts`;
    return fetch(postListUrl, {
               method: 'GET',
               headers: { 'Authorization': 'benkitti2' }
           })
           .then((response) => response.json())
           .then((postList) => postList);
}

function submitNewPost () {
    const uuidv1 = require('uuid/v1');
    const url = `http://localhost:3001/posts?id=${uuidv1()}&timestamp=${Date.now()}&title=testTitle&body=testBody&author=ben&category="udacity"`;
    return fetch(url, {
               method: 'POST',
               headers: { 'Authorization': 'benkitti2' }
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