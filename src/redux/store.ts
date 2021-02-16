import {
  AnyAction,
  configureStore,
  EnhancedStore,
  getDefaultMiddleware,
  Middleware,
  MiddlewareArray,
} from '@reduxjs/toolkit';
import { useMemo } from 'react';
import createSagaMiddleware from 'redux-saga';

import { rootReducer, RootState, rootState } from './root-reducer';
import rootSaga from './root-saga';

/**
 * Constants
 */

const isClient = typeof window !== 'undefined';
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

/**
 * Default middleware
 */

const middleware = getDefaultMiddleware({ thunk: false });

/**
 * Setup Redux logger
 */

if (isDevelopment) {
  const { logger } = require(`redux-logger`);

  middleware.push(logger);
}

/**
 * Setup store
 */

let store:
  | undefined
  | EnhancedStore<
      RootState,
      AnyAction,
      MiddlewareArray<Middleware<AnyAction, RootState>>
    >;

function initStore(preloadedState = rootState) {
  const sagaMiddleware = createSagaMiddleware();

  const _store = configureStore({
    devTools: !isProduction,
    preloadedState,
    reducer: rootReducer,
    middleware: [...middleware, sagaMiddleware],
  });

  // Avoid memory leaks, lel.
  if (isClient) {
    sagaMiddleware.run(rootSaga);
  }

  return _store;
}

const initializeStore = (preloadedState: RootState) => {
  let _store = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    store = undefined;
  }

  // This check needs to run in the functions scope.
  if (typeof window === 'undefined') return _store;

  if (!store) store = _store;

  return _store;
};

function useStore(initialState: RootState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}

export { useStore };
