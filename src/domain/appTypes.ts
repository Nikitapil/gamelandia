export enum EAppActionstypes {
  SET_NOTIFICATION = "SET_NOTIFICATION",
  SET_BREADCRAMBS = "SET_BREADCRUMBS"
}

export interface Inotification {
  timeout?: number;
  message: string;
  type: "error" | "success";
}
export interface IBreabcrumb {
  name: string;
  path: string
}
export interface AppInitialState {
  notification: Inotification;
  breadcrumbs: IBreabcrumb[]
}

interface ISetNotification {
  type: EAppActionstypes.SET_NOTIFICATION;
  payload: Inotification;
}

interface ISetBreadcrumbs {
  type: EAppActionstypes.SET_BREADCRAMBS;
  payload: IBreabcrumb[]
}

export type AppActions = ISetNotification | ISetBreadcrumbs;

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}
