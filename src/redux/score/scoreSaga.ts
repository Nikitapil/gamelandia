import { call, put, takeEvery } from "redux-saga/effects";
import { EScoreActionsTypes, IBoardScore } from "../../domain/scoreTypes";
import { ScoreService } from "../../services/scoreService";
import { setBoardScores } from "./scoreActions";

function* getBoardScores({ payload }: any) {
  try {
    const response: IBoardScore[] = yield call(() =>
      ScoreService.getBestScores(payload)
    );
    yield put(setBoardScores(response));
  } catch (e) {
    console.error(e);
  }
}

export function* scoreSaga() {
  yield takeEvery(EScoreActionsTypes.FETCH_BOARD_SCORES, getBoardScores);
}
