// import { take, call, put, select } from 'redux-saga/effects';

import { REQUEST_LINKS, START_ADD } from './constants';
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { requestLinksSucceeded, requestLinksFailed } from './actions';
import { push } from 'react-router-redux';

function fetchLinksFromServer(topicName) {
  return fetch(`http://localhost:3000/api/topics/${topicName}/links`)
    .then(response => response.json());
}

function* fetchLinks(action) {
  try {
    if (action.topicName !== '') {
      const links = yield call(fetchLinksFromServer, action.topicName);
      yield put(requestLinksSucceeded(links));
    } else {
      throw new Error('Not a topic');
    }
  }
  catch(e) {
    yield put(requestLinksFailed(e.message));
  }
}

function* startAdd(action) {
  yield put(push(`/topics/${action.topicName}/add`));
}

// Individual exports for testing
export function* fetchLinksSaga() {
  yield* takeLatest(REQUEST_LINKS, fetchLinks);
}

export function* startAddSaga() {
  yield* takeLatest(START_ADD, startAdd);
}


// All sagas to be loaded
export default [
  fetchLinksSaga,
  startAddSaga
];
