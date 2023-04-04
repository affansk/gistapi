import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import homeReducer from '@app/slice/homeSlice';
import {rootSaga} from '@app/sagas';

const saga = createSagaMiddleware();
const middleware = [saga]
export const store = configureStore({
  reducer: {
    home: homeReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(middleware),
});

saga.run(rootSaga);