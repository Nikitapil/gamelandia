import {
  EAppActionstypes,
  IBreabcrumb,
  Inotification,
} from "../../domain/appTypes";

export const setAppNotification = (payload: Inotification) => {
  return {
    type: EAppActionstypes.SET_NOTIFICATION,
    payload,
  };
};

export const setBreadCrumbs = (payload: IBreabcrumb[]) => {
  return {
    type: EAppActionstypes.SET_BREADCRAMBS,
    payload,
  };
};
