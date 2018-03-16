import {
    LOAD_ALL_POSTS_SUCCESS,
    ADD_NEW_POST_SUCCESS,
    FETCH_CATEGORIES_SUCCESS,
    VOTE_SUCCESS,
    DELETE_POST_SUCCESS,
    EDIT_POST_SUCCESS,
    SORT_BY_SCORE_ASC,
    SORT_BY_SCORE_DESC,
    FETCH_COMMENTS_SUCCESS,
    VOTE_COMMENT_SUCCESS,
    EDIT_COMMENT_SUCCESS
} from '../actions';
import { combineReducers } from 'redux';

const initialState = {
    postList: [],
    comments: []
}

function comment (state = {}, action) {
    switch (action.type) {
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
        case EDIT_COMMENT_SUCCESS:
            return {
                ...state,
                comments: state.comments.map(comment => comment.id === action.editedComment.id ? action.editedComment : comment)
            }
        default:
            return state;
    }
}

function post (state = initialState, action) {
    switch (action.type) {
        case LOAD_ALL_POSTS_SUCCESS:
            return {
                ...state,
                postList: action.allPosts
            };
        case ADD_NEW_POST_SUCCESS:
            console.log('add new post reducer');
            return {
                ...state,
                postList: [...state.postList, action.newPost]
            };
        case VOTE_SUCCESS:
            return {
                ...state,
                postList: state.postList.map(post => post.id === action.post.id ? action.post : post)
            }
        case DELETE_POST_SUCCESS:
            return {
                ...state,
                postList: state.postList.filter(post => post.id !== action.deletedPost.id)
            }
        case EDIT_POST_SUCCESS:
            return {
                ...state,
                postList: state.postList.map(post => post.id === action.editedPost.id ? action.editedPost : post)
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