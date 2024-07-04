import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';  // Import configureStore from Redux Toolkit
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';  // Import the root reducer
import rootSaga from './sagas';  // Import the root saga

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    sagaMiddleware,
  ],
  devTools: process.env.NODE_ENV !== 'production',  // Enable Redux DevTools in development
});

sagaMiddleware.run(rootSaga);

export default store;
