import { SnakeService } from './../../services/SnakeService';
import { takeEvery, put, call } from "redux-saga/effects";
import { SetAllSnakeBestScores, SetSnakeMyBestScores } from './snakeActions';
import { ESnakeActions, ISnakeInitialState } from '../../domain/snakeTypes';

function* getSnakeBestScores() {
    try {
        const response: ISnakeInitialState = yield call(SnakeService.getBestScores)
        yield put(SetAllSnakeBestScores(response?.allBestScores!))
        yield put(SetSnakeMyBestScores(response?.myBestScores!))
    } catch(e) {
        console.error(e)
    }
}

export function* snakeSaga() {
   yield takeEvery(ESnakeActions.FETCH_SNAKE_BEST_SCORE, getSnakeBestScores)
}