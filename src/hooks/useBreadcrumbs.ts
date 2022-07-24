import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IBreabcrumb } from "../domain/appTypes";
import { setBreadCrumbs } from '../redux/appStore/appActions';

export const useBreadcrumbs = (breadcrubsArray: IBreabcrumb[]) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setBreadCrumbs(breadcrubsArray))
    }, [])
}