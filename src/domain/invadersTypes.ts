export enum EInvadersDirections {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export enum EInvadersActionsTypes {
  SET_INVADERS_SCORES = 'SET_INVADERS_SCORES',
  FETCH_INVADERS_SCORES = 'FETCH_INVADERS_SCORES'
}

export interface IInvadersScore {
  uid: string,
  name: string,
  score: number
}
export interface IInvadersInitialState {
  scores: IInvadersScore[]
}

export interface IInvadersSetScoresAction {
   type: EInvadersActionsTypes.SET_INVADERS_SCORES,
   payload: IInvadersScore[]
}

export type TInvadersActions = IInvadersSetScoresAction