import {spawn} from 'redux-saga/effects';
import homeSaga from './homeSaga';
import commonSaga from './commonSaga';
import policyStepSaga from './policyStepSaga';
export default function* rootSaga() {
  yield spawn(homeSaga);
  yield spawn(commonSaga);
  yield spawn(policyStepSaga);
}
