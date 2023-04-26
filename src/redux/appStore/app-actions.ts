import { EAppActionstypes, IBreabcrumb } from '../../types/app-types';

export const setBreadCrumbs = (payload: IBreabcrumb[]) => {
  return {
    type: EAppActionstypes.SET_BREADCRAMBS,
    payload
  };
};
