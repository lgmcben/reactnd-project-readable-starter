import {
    LOAD_ALL_POSTS
} from '../actions'

const initialState = {
    postList: [],
    test: 'test value'
}

function loadAllPostReducer (state = initialState, action) {
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

export default loadAllPostReducer;