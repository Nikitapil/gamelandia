import {
  EInvadersActionsTypes,
  IInvadersScore,
} from "../../domain/invadersTypes";

export const setInvadersScores = (payload: IInvadersScore[]) => {
  return {
    type: EInvadersActionsTypes.SET_INVADERS_SCORES,
    payload,
  };
};

export const fetchInvadersScores = () => {
  return {
    type: EInvadersActionsTypes.FETCH_INVADERS_SCORES,
  };
};
