import { breadcrumbs } from '../../constants/breadcrumbs';
import {
  AppActions,
  AppInitialState,
  EAppActionstypes
} from '../../types/app-types';

const initialState: AppInitialState = {
  breadcrumbs: [breadcrumbs.main]
};

export const appReducer = (
  state = initialState,
  action: AppActions
): AppInitialState => {
  switch (action.type) {
    case EAppActionstypes.SET_BREADCRAMBS:
      return { ...state, breadcrumbs: action.payload };
    default:
      return state;
  }
};
