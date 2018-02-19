import fetchPostList from '../utils/api';
import {
    LOAD_ALL_POSTS
} from '../actions'

const initialState = {
    postList: []
}

function loadAllPostReducer (state = initialState, action) {
    switch (action.type) {
        case LOAD_ALL_POSTS:
            fetchPostList().then(postList => {
                console.log('reducer postList = ', postList);
                return {
                    //return new loaded post list
                    ...state,
                    postList
                };
            });
            break;
        default:
            return state;
    }
}

export default loadAllPostReducer;