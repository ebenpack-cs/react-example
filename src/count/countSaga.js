import {all, takeEvery, call, put, fork, select} from 'redux-saga/effects';
import {DELAYED_INCREMENT, DELAYED_DECREMENT, incrementActionDispatcher, decrementActionDispatcher} from "./countModule";

// Simulates an asynchronous call, like an HTTP request.
// This isn't *really* doing anything though. It just returns
// a promise that resolves to the value passed after `delay` amount of time
let delayedCall = (delay, n) => new Promise(
    resolve => setTimeout(() => resolve(n), delay)
);


function* incrementSaga({n}) {
    // Pull `delay` from redux store
    const delay = yield(select(state => state.count.get('delay')));
    // Call async function
    const asyncN = yield call(delayedCall, delay, n)
    // Dispatch increment action
    yield put(incrementActionDispatcher(asyncN));
}

function* decrementSaga({n}) {
    const delay = yield(select(state => state.count.get('delay')));
    const asyncN = yield call(delayedCall, delay, n);
    yield put(decrementActionDispatcher(asyncN));
}

function* watchIncrementSaga() {
    // Watch for `DELAYED_INCREMENT` actions
    yield takeEvery(DELAYED_INCREMENT, incrementSaga);
}

function* watchDecrementSaga() {
    // Watch for `DELAYED_DECREMENT` actions
    yield takeEvery(DELAYED_DECREMENT, decrementSaga);
}


export default function* root() {
    yield all([
        fork(watchIncrementSaga),
        fork(watchDecrementSaga),
    ]);
}
