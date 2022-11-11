import { call, put, takeEvery } from 'redux-saga/effects';
import { EScoreActionsTypes, IBoardScore } from '../../types/scoreTypes';
import { ScoreService } from '../../services/scoreService';
import { setBoardLoading, setBoardScores } from './scoreActions';

function* getBoardScores({ payload }: any) {
  try {
    yield put(setBoardLoading(true));
    const response: IBoardScore[] = yield call(() =>
      ScoreService.getBestScores(payload)
    );
    yield put(setBoardScores(response));
  } catch (e) {
    console.error(e);
  } finally {
    yield put(setBoardLoading(false));
  }
}

export function* scoreSaga() {
  yield takeEvery(EScoreActionsTypes.FETCH_BOARD_SCORES, getBoardScores);
}
