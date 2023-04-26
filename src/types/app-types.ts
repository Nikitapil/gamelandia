export enum EAppActionstypes {
  SET_BREADCRAMBS = 'SET_BREADCRUMBS'
}

export interface IBreabcrumb {
  id: string;
  name: string;
  path: string;
}
export interface AppInitialState {
  breadcrumbs: IBreabcrumb[];
}

interface ISetBreadcrumbs {
  type: EAppActionstypes.SET_BREADCRAMBS;
  payload: IBreabcrumb[];
}

export type AppActions = ISetBreadcrumbs;

export type TStringKeyObject = {
  [key: string]: string;
};
