import * as PostAPIUtil from '../utils/api';


export const LOAD_ALL_POSTS_SUCCESS = 'LOAD_ALL_POSTS_SUCCESS';
export const ADD_NEW_POST_SUCCESS = 'ADD_NEW_POST_SUCCESS';

export const receiveAllPostsSuccess = allPosts => (
    {
        type: LOAD_ALL_POSTS_SUCCESS,
        allPosts
    }
);

export const fetchAllPostsRequest = () => dispatch => (
    PostAPIUtil.fetchPostList()
               .then(allPosts => dispatch(receiveAllPostsSuccess(allPosts)))
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