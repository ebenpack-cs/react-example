import {all, takeEvery, call, put, fork, delay} from 'redux-saga/effects';
import axios from 'axios';
import {fetchPostsSuccess, fetchPostsFailure, fetchPostsInProgress, FETCH_POST} from './postsModule';

function* fetchPosts() {
    try {
        // Dispatch action to update 'posts.fetching' in store (used for showing spinner)
        yield put(fetchPostsInProgress());
        // Make HTTP request to fetch posts ('blocking')
        const {data} = yield call(axios.get, 'https://jsonplaceholder.typicode.com/posts');
        // Add some delay to show off our sweet spinner
        yield delay(2500);
        // Success? Dispatch 'success' action to put posts in store
        yield put(fetchPostsSuccess(data));
    } catch(err) {
        // Error? Dispatch 'error' action to show whoopsie message
        const error = err.data ? err.data : err;
        yield put(fetchPostsFailure(error));
    }
}

const preload = url => {
    const img = new Image();
    img.src = url;
};

function* watchFetchPostSaga() {
    // Watch for `FETCH_POST` actions
    yield takeEvery(FETCH_POST, fetchPosts);
}

function* preloadSpinner() {
    // Preload spinner image ahead of time, so we don't need a spinner for our spinner
    yield call(preload, 'https://media.giphy.com/media/3ohzdL95gkIo73F3Vu/source.gif');
}

export default function* root() {
    yield all([
        fork(watchFetchPostSaga),
        fork(preloadSpinner)
    ]);
}
