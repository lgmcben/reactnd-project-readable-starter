import {
    ADD_NEW_COMMENT_SUCCESS,
    ADD_NEW_POST_SUCCESS,
    DELETE_COMMENT_SUCCESS,
    DELETE_POST_SUCCESS,
    EDIT_COMMENT_SUCCESS,
    EDIT_POST_SUCCESS,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_COMMENTS_SUCCESS,
    FETCH_SINGLE_POST_SUCCESS,
    LOAD_ALL_POSTS_SUCCESS,
    SORT_BY_SCORE_ASC,
    SORT_BY_SCORE_DESC,
    VOTE_COMMENT_SUCCESS,
    VOTE_SUCCESS,
} from '../actions';
import { combineReducers } from 'redux';

const initialState = {
    postList: [],
    postDetail: {},
    comments: []
}

function comment (state = {}, action) {
    switch (action.type) {
        case ADD_NEW_COMMENT_SUCCESS:
            return {
                ...state,
                comments: [...state.comments, action.newComment]
            };
        case DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                comments: state.comments.filter(comment => comment.id !== action.deletedComment.id)
            }
        case EDIT_COMMENT_SUCCESS:
            return {
                ...state,
                comments: state.comments.map(comment => comment.id === action.editedComment.id ? action.editedComment : comment)
            }
        case FETCH_COMMENTS_SUCCESS:
            return {
                ...state,
                comments: action.comments
            };
        case VOTE_COMMENT_SUCCESS:
            return {
                ...state,
                comments: state.comments.map(comment => comment.id === action.comment.id ? action.comment : comment)
            }
        default:
            return state;
    }
}

function post (state = initialState, action) {
    switch (action.type) {
        case ADD_NEW_POST_SUCCESS:
            console.log('add new post reducer');
            return {
                ...state,
                postList: [...state.postList, action.newPost]
            };
        case DELETE_POST_SUCCESS:
            return {
                ...state,
                postList: state.postList.filter(post => post.id !== action.deletedPost.id),
                postDetail: null
            }
        case EDIT_POST_SUCCESS:
            return {
                ...state,
                postList: state.postList.map(post => post.id === action.editedPost.id ? action.editedPost : post),
                postDetail: action.editedPost
            }
        case FETCH_SINGLE_POST_SUCCESS:
            return {
                ...state,
                postDetail: action.postDetail
            }
        case LOAD_ALL_POSTS_SUCCESS:
            return {
                ...state,
                postList: action.allPosts
            };

        case VOTE_SUCCESS:
            return {
                ...state,
                postList: state.postList.map(post => post.id === action.post.id ? action.post : post),
                postDetail: action.post

            }
        case SORT_BY_SCORE_ASC:
            return {
                ...state,
                postList: [...state.postList].sort(compareAsc)
            }
        case SORT_BY_SCORE_DESC:
            return {
                ...state,
                postList: [...state.postList].sort(compareDesc)
            }
        default:
            return state;
    }
}

function category (state = {}, action) {
    switch (action.type) {
        case FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.categories
            };
        default:
            return state;
    }
}

function compareAsc(a, b) {
    if (a.voteScore < b.voteScore) {
        return -1;
    }
    if (a.voteScore > b.voteScore) {
        return 1;
    }
    return 0;
}

function compareDesc(a, b) {
    if (a.voteScore > b.voteScore) {
        return -1;
    }
    if (a.voteScore < b.voteScore) {
        return 1;
    }
    return 0;
}

export default combineReducers({
    comment,
    post,
    category
});
