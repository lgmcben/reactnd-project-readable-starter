export const LOAD_ALL_POSTS = 'LOAD_ALL_POSTS';
export const ADD_NEW_POST = 'ADD_NEW_POST';

export function loadAllPosts(allPosts) {
    return {
        type: LOAD_ALL_POSTS,
        allPosts
    };
};

export function addNewPost(newPost) {
    return {
        type: ADD_NEW_POST,
        newPost
    };
};
