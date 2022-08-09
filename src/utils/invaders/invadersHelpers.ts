import { IInvadersScore } from "../../domain/invadersTypes";

export const getNewInvadersScores = (
  oldScores: IInvadersScore[],
  newScore: IInvadersScore
) => {
  if (oldScores[oldScores.length - 1].score < newScore.score) {
    oldScores[oldScores.length - 1] = newScore;
  }

  return oldScores;
};
