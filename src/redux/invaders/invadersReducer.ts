import {
  EInvadersActionsTypes,
  IInvadersInitialState,
  TInvadersActions,
} from "../../domain/invadersTypes";

const initialState: IInvadersInitialState = {
  scores: [],
};

export const invadersReducer = (
  state = initialState,
  action: TInvadersActions
) => {
  switch (action.type) {
    case EInvadersActionsTypes.SET_INVADERS_SCORES:
      return { ...state, scores: action.payload };
    default:
      return { ...state };
  }
};
