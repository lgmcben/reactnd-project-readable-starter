import * as PostAPIUtil from '../utils/api';

// I followed naming convention described here: https://decembersoft.com/posts/a-simple-naming-convention-for-action-creators-in-redux-js/

export const LOAD_ALL_POSTS_SUCCESS = 'LOAD_ALL_POSTS_SUCCESS';
export const ADD_NEW_POST_SUCCESS = 'ADD_NEW_POST_SUCCESS';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const VOTE_SUCCESS = 'VOTE_SUCCESS';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const SORT_BY_SCORE_ASC = "SORT_BY_SCORE_ASC";
export const SORT_BY_SCORE_DESC = "SORT_BY_SCORE_DESC";

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

export const addNewPostRequest = newPost => dispatch => (
    PostAPIUtil.submitNewPost(newPost)
               .then(addedPost => dispatch(addNewPostSuccess(addedPost)))
);

export const upVoteSuccess = post => (
    {
        type: VOTE_SUCCESS,
        post
    }
)

export const upVoteRequest = postId => dispatch => (
    PostAPIUtil.vote({id: postId, option: PostAPIUtil.UPVOTE})
               .then(post => dispatch(upVoteSuccess(post)))
);

export const downVoteRequest = postId => dispatch => (
    PostAPIUtil.vote({id: postId, option: PostAPIUtil.DOWNVOTE})
               .then(post => dispatch(upVoteSuccess(post)))
)

export const deletePostSuccess = (deletedPost) => (
    {
        type: DELETE_POST_SUCCESS,
        deletedPost
    }
)

export const editPostSuccess = (editedPost) => (
    {
        type: EDIT_POST_SUCCESS,
        editedPost
    }
)

export const deletePostRequest = postId => dispatch => (
    PostAPIUtil.deletePost(postId)
               .then(deletedPost => dispatch(deletePostSuccess(deletedPost)))
)

export const editPostRequest = ({id, title, body} = {}) => dispatch => (
    PostAPIUtil.editPost({id: id, title: title, body: body})
               .then(editedPost => dispatch(editPostSuccess(editedPost)))
)

export const sortByScoreAsc = () => (
    {
        type: SORT_BY_SCORE_ASC,
    }
)

export const sortByScoreDesc = () => (
    {
        type: SORT_BY_SCORE_DESC,
    }
)
