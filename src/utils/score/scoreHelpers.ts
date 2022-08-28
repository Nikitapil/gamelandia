import { IBoardScore } from "../../domain/scoreTypes";

export const getNewBoardScores = (
  oldScores: IBoardScore[],
  newScore: IBoardScore
) => {
  if (oldScores[oldScores.length - 1].score < newScore.score) {
    oldScores[oldScores.length - 1] = newScore;
  }

  return oldScores;
};
