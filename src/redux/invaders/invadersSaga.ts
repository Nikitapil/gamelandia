import { call, put, takeEvery } from "redux-saga/effects";
import {
  EInvadersActionsTypes,
  IInvadersScore,
} from "../../domain/invadersTypes";
import { InvadersService } from "../../services/InvadersService";
import { setInvadersScores } from "./invadersActions";

function* getInvadersScores() {
  try {
    const response: IInvadersScore[] = yield call(
      InvadersService.getBestScores
    );
    yield put(setInvadersScores(response));
  } catch (e) {
    console.error(e);
  }
}

export function* invadersSaga() {
  yield takeEvery(
    EInvadersActionsTypes.FETCH_INVADERS_SCORES,
    getInvadersScores
  );
}
