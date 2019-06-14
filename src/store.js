import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import createSagaMiddleware, {END} from 'redux-saga';

import './index.css';
import countReducer from './count/countModule';
import postsReducer from './posts/postsModule';
import countSaga from './count/countSaga';
import postsSaga from './posts/postsSaga';

export default () => {
    // Create our saga middleware. Other middleware could go here too if we wanted.
    const sagaMiddleware = createSagaMiddleware();
    const middleware = [sagaMiddleware];

    const enhancers = compose(
        applyMiddleware(...middleware),
        // This just allows us to use redux devtools in
        typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? // eslint-disable-line no-underscore-dangle
            window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line no-underscore-dangle
            : f => f /* eslint id-length: 0 */ // eslint exception
    );

    // Combine our reducers. Each reducer will still be in control of it's own part of
    // the state tree, but this combines them at the top-level into one store.
    const appReducer = combineReducers({
        count: countReducer,
        posts: postsReducer
    });

    // Make our redux store
    const store = createStore(appReducer, enhancers);

    // Wire up our sagas
    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);
    store.runSaga(postsSaga);
    store.runSaga(countSaga);

    return store;
}
