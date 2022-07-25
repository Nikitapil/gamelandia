import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { IBreabcrumb } from "../domain/appTypes";
import { setBreadCrumbs } from "../redux/appStore/appActions";

export const useBreadcrumbs = (breadcrubsArray: IBreabcrumb[]) => {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(setBreadCrumbs(breadcrubsArray));
  }, []);
};
