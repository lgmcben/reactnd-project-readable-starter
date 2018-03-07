import {
    LOAD_ALL_POSTS_SUCCESS,
    ADD_NEW_POST_SUCCESS,
    FETCH_CATEGORIES_SUCCESS,
    VOTE_SUCCESS
} from '../actions';
import { combineReducers } from 'redux';

const initialState = {
    postList: [],
}

function comment (state = {}, action) {
    switch (action.type) {
        case LOAD_ALL_POSTS_SUCCESS:
            return {
                ...state,
                comment: 'test comment state'
            };
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

export default combineReducers({
    comment,
    post,
    category
});