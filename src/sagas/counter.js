/* eslint-disable no-constant-condition */

import { put, call, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';

export function* incrementAsync () {
  yield call(delay, 1000);
  yield put({ type: 'INCREMENT' });
}

export default function* counterSaga() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}
