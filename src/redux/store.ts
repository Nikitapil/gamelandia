import { applyMiddleware, createStore } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import { snakeSaga } from './snake/snake-sagas';
import { rootReducer } from './root-reducer';
import { scoreSaga } from './score/score-saga';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

function* rootSaga() {
  yield all([snakeSaga(), scoreSaga()]);
}

sagaMiddleware.run(rootSaga);
