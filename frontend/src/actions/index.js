export const LOAD_ALL_POSTS = 'LOAD_ALL_POSTS';

export function loadAllPosts(allPosts) {
    return {
        type: LOAD_ALL_POSTS,
        allPosts
    };
};