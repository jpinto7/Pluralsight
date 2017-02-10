// import { take, call, put, select } from 'redux-saga/effects';

import { REQUEST_LINKS } from './constants';
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { requestLinksSucceeded, requestLinksFailed } from './actions';

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

// Individual exports for testing
export function* fetchLinksSaga() {
  yield* takeLatest(REQUEST_LINKS, fetchLinks);
}

// All sagas to be loaded
export default [
  fetchLinksSaga
];
