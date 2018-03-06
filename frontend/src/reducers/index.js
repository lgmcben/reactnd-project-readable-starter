import {
    LOAD_ALL_POSTS_SUCCESS,
    ADD_NEW_POST_SUCCESS
} from '../actions';
import { combineReducers } from 'redux';

const initialState = {
    postList: [],
}

function comments (state = {}, action) {
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

function posts (state = initialState, action) {
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
        default:
            return state;
    }
}

export default combineReducers({
    comments,
    posts
});