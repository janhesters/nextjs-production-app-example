import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  test: (state = {}) => state,
});

const rootState = rootReducer(undefined, { type: '' });

export type RootState = ReturnType<typeof rootReducer>;

export { rootReducer, rootState };
