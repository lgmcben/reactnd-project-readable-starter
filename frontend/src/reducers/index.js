import fetchPostList from '../utils/api';
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
            fetchPostList().then(postList => {
                console.log('reducer postList = ', postList);
            });
            return {
                //return new loaded post list
                ...state,
            };
        default:
            return state;
    }
}

export default loadAllPostReducer;