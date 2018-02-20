import {
    LOAD_ALL_POSTS
} from '../actions';
import { combineReducers } from 'redux';

const initialState = {
    postList: [],
    test: 'test value'
}

function comments (state = {}, action) {
    switch (action.type) {
        case LOAD_ALL_POSTS:
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
        case LOAD_ALL_POSTS:
            //TODO: Temporary api call for testing
            return {
                //return new loaded post list
                ...state,
                postList: action.allPosts
            };
        default:
            return state;
    }
}

export default combineReducers({
    comments,
    posts
});