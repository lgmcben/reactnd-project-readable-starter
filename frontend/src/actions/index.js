export const LOAD_ALL_POSTS = 'LOAD_ALL_POSTS';
export const SUBMIT_NEW_POST = 'SUBMIT_NEW_POST';

export function loadAllPosts(allPosts) {
    return {
        type: LOAD_ALL_POSTS,
        allPosts
    };
};

export function submitNewPost(allPosts) {
    return {
        type: LOAD_ALL_POSTS,
        allPosts
    };
};
