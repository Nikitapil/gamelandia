export enum EAppActionstypes {
  SET_NOTIFICATION = "SET_NOTIFICATION",
}

export interface Inotification {
  timeout?: number;
  message: string;
  type: "error" | "success";
}

export interface AppInitialState {
  notification: Inotification;
}

interface ISetNotification {
  type: EAppActionstypes.SET_NOTIFICATION;
  payload: Inotification;
}

export type AppActions = ISetNotification;

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}
