import * as PostAPIUtil from '../utils/api';

// I followed naming convention described here: https://decembersoft.com/posts/a-simple-naming-convention-for-action-creators-in-redux-js/

export const LOAD_ALL_POSTS_SUCCESS = 'LOAD_ALL_POSTS_SUCCESS';
export const ADD_NEW_POST_SUCCESS = 'ADD_NEW_POST_SUCCESS';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const VOTE_SUCCESS = 'VOTE_SUCCESS';
export const VOTE_COMMENT_SUCCESS = 'VOTE_COMMENT_SUCCESS';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const ADD_NEW_COMMENT_SUCCESS = 'ADD_NEW_COMMENT_SUCCESS';
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

export const addNewCommentSuccess = (newComment) => (
    {
        type: ADD_NEW_COMMENT_SUCCESS,
        newComment
    }
)

export const addNewCommentRequest = newComment => dispatch => (
    PostAPIUtil.submitNewComment(newComment)
               .then(addedComment => dispatch(addNewCommentSuccess(addedComment)))
);

export const voteSuccess = post => (
    {
        type: VOTE_SUCCESS,
        post
    }
)

export const voteCommentSuccess = comment => (
    {
        type: VOTE_COMMENT_SUCCESS,
        comment
    }
)

export const upVoteRequest = postId => dispatch => (
    PostAPIUtil.vote({id: postId, option: PostAPIUtil.UPVOTE})
               .then(post => dispatch(voteSuccess(post)))
);

export const downVoteRequest = postId => dispatch => (
    PostAPIUtil.vote({id: postId, option: PostAPIUtil.DOWNVOTE})
               .then(post => dispatch(voteSuccess(post)))
)

export const upVoteCommentRequest = commentId => dispatch => (
    PostAPIUtil.voteComment({id: commentId, option: PostAPIUtil.UPVOTE})
               .then(comment => dispatch(voteCommentSuccess(comment)))
);

export const downVoteCommentRequest = commentId => dispatch => (
    PostAPIUtil.voteComment({id: commentId, option: PostAPIUtil.DOWNVOTE})
               .then(comment => dispatch(voteCommentSuccess(comment)))
);

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

export const editCommentSuccess = (editedComment) => (
    {
        type: EDIT_COMMENT_SUCCESS,
        editedComment
    }
)

export const deletePostRequest = postId => dispatch => (
    PostAPIUtil.deletePost(postId)
               .then(deletedPost => dispatch(deletePostSuccess(deletedPost)))
)

export const deleteCommentSuccess = (deletedComment) => (
    {
        type: DELETE_COMMENT_SUCCESS,
        deletedComment
    }
)

export const deleteCommentRequest = commentId => dispatch => (
    PostAPIUtil.deleteComment(commentId)
               .then(deletedComment => dispatch(deleteCommentSuccess(deletedComment)))
)

export const editPostRequest = ({id, title, body} = {}) => dispatch => (
    PostAPIUtil.editPost({id: id, title: title, body: body})
               .then(editedPost => dispatch(editPostSuccess(editedPost)))
)

export const editCommentRequest = ({id, body} = {}) => dispatch => (
    PostAPIUtil.editComment({id: id, body: body})
               .then(editedComment => dispatch(editCommentSuccess(editedComment)))
)

export const sortByScoreAsc = () => (
    {
        type: SORT_BY_SCORE_ASC
    }
)

export const sortByScoreDesc = () => (
    {
        type: SORT_BY_SCORE_DESC
    }
)

export const fetchCommentsSuccess = (comments) => (
    {
        type: FETCH_COMMENTS_SUCCESS,
        comments
    }
)

export const fetchCommentsRequest = postId => dispatch => {
    PostAPIUtil.fetchComments(postId)
               .then(comments => dispatch(fetchCommentsSuccess(comments)))
}