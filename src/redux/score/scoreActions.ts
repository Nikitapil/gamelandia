import {
  EGamesWithScoreBoard,
  EScoreActionsTypes,
  IBoardScore,
} from "../../domain/scoreTypes";

export const setBoardScores = (payload: IBoardScore[]) => {
  return {
    type: EScoreActionsTypes.SET_BOARD_SCORES,
    payload,
  };
};

export const fetchBoardScores = (payload: EGamesWithScoreBoard) => {
  return {
    type: EScoreActionsTypes.FETCH_BOARD_SCORES,
    payload,
  };
};
