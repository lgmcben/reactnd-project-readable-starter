export default function fetchPostList () {
    const postListUrl = `http://localhost:3001/posts`;
    return fetch(postListUrl, {
               method: 'GET',
               headers: { 'Authorization': 'benkitti' }
           })
           .then((response) => response.json())
           .then((postList) => postList);
}