import {fromJS} from 'immutable';

// Post actions
export const FETCH_POST = 'POST_FETCH';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE';
export const FETCH_POST_IN_PROGRESS ='FETCH_POST_IN_PROGRESS';

// Action dispatchers
export const fetchPostsActionDispatcher = () => ({type: FETCH_POST});
export const fetchPostsInProgress = () => ({type: FETCH_POST_IN_PROGRESS});
export const fetchPostsSuccess = posts => ({type: FETCH_POST_SUCCESS, posts});
export const fetchPostsFailure = error => ({type: FETCH_POST_FAILURE, error});


// Reducer
const initialState = fromJS({posts: [], error: '', fetching: false});

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POST_IN_PROGRESS:
            return state.set('fetching', true);
        case FETCH_POST_SUCCESS:
            return state.merge({
                posts: fromJS(action.posts),
                fetching: false
            });
        case FETCH_POST_FAILURE:
            return state.merge({
                error: `Whoopsie daisey... ${action.error}`,
                fetching: false
            });
        default:
            return state;
    }
};

export default postsReducer;
