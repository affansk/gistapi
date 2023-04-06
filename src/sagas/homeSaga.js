import { call, put, takeLatest } from 'redux-saga/effects';
import { gist } from '../services/index';

import {
  gistSuccess,
  gistFailed,
} from '../slice/HomeSlice';

function* gistAction(action) {
  const response = yield call(gist);
  const { status} = response || {};
  if (status === 200) {
    yield put(gistSuccess(response?.data));
  } else {
    yield put(gistFailed({message:'someething Wrong with response. Please Try Again!'})); // Here we can display dynamic error reponse from API. just ned to replace message with dyanmic message from api.
  }

}
function* homeSaga() {
  yield takeLatest('home/getGist', gistAction);
}

export default homeSaga;
