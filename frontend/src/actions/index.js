import * as PostAPIUtil from '../utils/api';

// I followed naming convention described here: https://decembersoft.com/posts/a-simple-naming-convention-for-action-creators-in-redux-js/

export const LOAD_ALL_POSTS_SUCCESS = 'LOAD_ALL_POSTS_SUCCESS';
export const ADD_NEW_POST_SUCCESS = 'ADD_NEW_POST_SUCCESS';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS'
export const VOTE_SUCCESS = 'VOTE_SUCCESS';

export const fetchAllPostsSuccess = allPosts => (
    {
        type: LOAD_ALL_POSTS_SUCCESS,
        allPosts
    }
);

export const fetchAllPostsRequest = () => dispatch => (
    PostAPIUtil.fetchPostList()
               .then(allPosts => dispatch(fetchAllPostsSuccess(allPosts)))
);

export const fetchCategoriesSuccess = categories => (
    {
        type: FETCH_CATEGORIES_SUCCESS,
        categories
    }
);

export const fetchCategoriesRequest = () => dispatch => (
    PostAPIUtil.fetchCategories()
               .then(categories => dispatch(fetchCategoriesSuccess(categories)))
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

export const upVoteSuccess = post => (
    {
        type: VOTE_SUCCESS,
        post
    }
)

export const upVoteRequest = (postId) => dispatch => (
    PostAPIUtil.vote({id: postId, option: 'upVote'})
               .then(post => dispatch(upVoteSuccess(post)))
);


