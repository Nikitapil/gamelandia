import { breadcrumbs } from "../../constants/breadcrumbs";
import {
  AppActions,
  AppInitialState,
  EAppActionstypes,
} from "../../domain/appTypes";

const initialState: AppInitialState = {
  notification: {
    timeout: 5000,
    message: "",
    type: "error",
  },
  breadcrumbs: [breadcrumbs.main]
};

export const appReducer = (state = initialState, action: AppActions) => {
  switch (action.type) {
    case EAppActionstypes.SET_NOTIFICATION:
      return { ...state, notification: action.payload };
    case EAppActionstypes.SET_BREADCRAMBS:
      return {...state, breadcrumbs: action.payload}
    default:
      return state;
  }
};
