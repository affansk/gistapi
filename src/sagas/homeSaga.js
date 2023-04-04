import { call, put, takeLatest } from 'redux-saga/effects';
import { gist } from '../services/index';

import {
  gistSuccess,
  gistFailed,
} from '../slice/HomeSlice';

function* gistAction(action) {
  const response = yield call(gist);
  const { status} = response || {};
  console.log(response,"response??");
  if (status === 200) {
    yield put(gistSuccess(response?.data));
  } else {
    yield put(gistFailed(response));
  }

}
function* homeSaga() {
  yield takeLatest('home/getGist', gistAction);
}

export default homeSaga;
