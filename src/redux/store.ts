import { applyMiddleware, createStore } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import { snakeSaga } from './snake/snakeSagas';
import { rootReducer } from './rootReducer';
import { scoreSaga } from './score/scoreSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

function* rootSaga() {
  yield all([snakeSaga(), scoreSaga()]);
}

sagaMiddleware.run(rootSaga);
