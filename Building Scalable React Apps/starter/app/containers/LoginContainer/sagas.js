// import { take, call, put, select } from 'redux-saga/effects';
import { LOGIN, CANCEL_LOGIN } from './constants';
import { put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { goBack } from 'react-router-redux';

function* handleDone(action) {
  yield put(goBack());
}

// Individual exports for testing
export function* doLoginSaga() {
  yield* takeLatest(LOGIN, handleDone);
}

export function* cancelSaga() {
  yield* takeLatest(CANCEL_LOGIN, handleDone);
}

// All sagas to be loaded
export default [
  doLoginSaga,
  cancelSaga
];
