import * as PostAPIUtil from '../utils/api';


export const LOAD_ALL_POSTS = 'LOAD_ALL_POSTS';
export const ADD_NEW_POST_SUCCESS = 'ADD_NEW_POST_SUCCESS';

export const receiveAllPosts = allPosts => (
    {
        type: LOAD_ALL_POSTS,
        allPosts
    }
);

export const fetchAllPosts = () => dispatch => (
    PostAPIUtil.fetchPostList()
               .then(allPosts => dispatch(receiveAllPosts(allPosts)))
);

export const addNewPostSuccess = (newPost) => (
    {
        type: ADD_NEW_POST_SUCCESS,
        newPost
    }
)

export const addNewPostRequest = (newPost) => dispatch => (
    PostAPIUtil.submitNewPost(newPost)
               .then(addedPost => dispatch(addNewPostSuccess(addedPost)))
);