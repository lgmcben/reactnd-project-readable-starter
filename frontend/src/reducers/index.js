import {
    LOAD_ALL_POSTS
} from '../actions'

const initialState = {
    postList: []
}

function allPosts (state = initialState, action) {
    switch (action.type) {
        case LOAD_ALL_POSTS:
            return {
                //return new loaded post list
                ...state
            };
        default:
            return state;
    }
}

export default allPosts;