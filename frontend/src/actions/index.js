import * as PostAPIUtil from '../utils/api';


export const LOAD_ALL_POSTS = 'LOAD_ALL_POSTS';
export const ADD_NEW_POST = 'ADD_NEW_POST';

export const receiveAllPosts = allPosts => ({
    type: LOAD_ALL_POSTS,
    allPosts
});

export const fetchAllPosts = () => dispatch => (
    PostAPIUtil.fetchPostList()
               .then(allPosts => dispatch(receiveAllPosts(allPosts)))
);

export function addNewPost(newPost) {
    return {
        type: ADD_NEW_POST,
        newPost
    };
};
