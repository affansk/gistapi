import {spawn} from 'redux-saga/effects';
import homeSaga from './homeSaga';
export default function* rootSaga() {
  yield spawn(homeSaga);;
}
