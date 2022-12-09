import {
  EAppActionstypes,
  IBreabcrumb,
  Inotification
} from '../../types/app-types';

export const setAppNotification = (payload: Inotification) => {
  return {
    type: EAppActionstypes.SET_NOTIFICATION,
    payload
  };
};

export const setBreadCrumbs = (payload: IBreabcrumb[]) => {
  return {
    type: EAppActionstypes.SET_BREADCRAMBS,
    payload
  };
};
