export interface IBreabcrumb {
  id: string;
  name: string;
  path: string;
}

export interface IAppInitialState {
  breadcrumbs: IBreabcrumb[];
}
