import { call, put, takeLatest } from 'redux-saga/effects';
import { signin } from '@app/services';
import { EncryptedStorage } from '@app/components';
import {
  gistSuccess,
  gistFailed,
} from '../slice/HomeSlice';

function* gistAction(action) {
  const { payload } = action;
  const getCountryId = yield EncryptedStorage.getItem('selectedRegion');
  const response = yield call(signin, {
    ...payload,
    CountryId: getCountryId,
  });
  if (response?.data?.IsSuccess === true) {
    yield put(gistSuccess(response?.data));
  } else {
    yield put(gistFailed(response));
  }

}
function* homeSaga() {
  yield takeLatest('home/getGist', gistAction);
}

export default homeSaga;
