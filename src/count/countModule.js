import {Map} from 'immutable';

// Action types
// These are just plain strings, so sometimes care
// must be taken that multiple actions from different areas/for different purposes that are
// intended to be different don't end up colliding (e.g. `FETCH` or `UPDATE` is likely too broad
// where `UPDATE_NEWS_ITEMS`, or `FETCH_USER_COMMENTS`, are better, (though, depending on
// the application even these may not be specific enough)),
export const SET_N = 'SET_N';
export const SET_DELAY = 'SET_DELAY';
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
// These actions will be used in our sagas, for simulated async stuff.
export const DELAYED_INCREMENT = 'DELAYED_INCREMENT';
export const DELAYED_DECREMENT = 'DELAYED_DECREMENT';


// Action dispatchers
// These are just functions that (optionally) take arguments, and return an
// `action` (i.e. a plain JS object with a `type` property by which it is identified by reducers/sagas,
// and any other payload properties you need to pass with it). You *could*
// create these action objects on-the-fly as needed, but it is more convenient (e.g. for refactoring purposes),
// to delegate this task to these action dispatcher functions
export const incrementActionDispatcher = (n=1) => ({type: INCREMENT, n});
export const decrementActionDispatcher = (n=1) => ({type: DECREMENT, n});
export const delayedIcrementActionDispatcher = (n) => ({type: DELAYED_INCREMENT, n});
export const delayedDecrementActionDispatcher = (n) => ({type: DELAYED_DECREMENT, n});
export const setN = n => ({type: SET_N, n});
export const setDelay = delay => ({type: SET_DELAY, delay});

// Reducers

// Initial state 'seeds' the reducer. This is what will be in your store initially
const initialState = new Map({count: 0, n: 1, delay: 100});

// Reducers are run on every dispatched action. When the action type matches in the switch,
// a new, updated version of the store is returned. E.g. when the `INCREMENT` action is dispatched,
// a new version of the store will be returned where `action.n` (which is just a value passed along in
// the action payload) has been added to `count`. Reducers should always be pure functions of
// old state -> new state, and mutating the previous state should be avoided.
// When a reducer is run, the new state that is returned will be made available to your components that have
// been `connect`ed via `mapStateToProps`.
const countReducer = (state = initialState, action) => {
    let oldCount;
    let newCount;
    switch (action.type) {
        case SET_N:
            try {
                // We can do light validation in our reducer,
                // we can calculate/derive the new values. The sky's the limit
                const n = parseInt(action.n, 10);
                return state.set('n', n);
            } catch(e) {
                return state;
            }
        case SET_DELAY:
            try {
                const delay = parseInt(action.delay, 10);
                return state.set('delay', delay);
            } catch(e) {
                return state;
            }
        case INCREMENT:
            oldCount = state.get('count');
            newCount = oldCount + action.n;
            return state.set('count', newCount);
        case DECREMENT:
            oldCount = state.get('count');
            newCount = oldCount - action.n;
            return state.set('count', newCount);
        default:
            return state;
    }
};

export default countReducer;
