import { all, call } from 'redux-saga/effects';

function* helloWorld() {
  yield call(console.log, 'Hello World!');
}

function* rootSaga() {
  yield all([helloWorld()]);
}

export default rootSaga;
