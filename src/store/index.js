import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import homeReducer from '../slice/HomeSlice';
import {rootSaga} from '../sagas';

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