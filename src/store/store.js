import { compose, applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
//import thunk from 'redux-thunk';
//import { configureStore } from '@reduxjs/toolkit';

import { rootSaga } from './root-saga';

import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleware].filter(Boolean);

const composeEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composeEnhancers); 

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

//export const store = configureStore({
//  reducer: rootReducer,
//  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
//});