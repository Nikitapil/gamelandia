import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { setAppNotification } from '../../redux/appStore/appActions';
import { appSelector } from '../../redux/appStore/appSelectors';
import notificationStyles from '../../styles/notification.module.scss';

export const Notification = () => {
  const { notification } = useTypedSelector(appSelector);
  const dispatch = useDispatch();

  const classes = useMemo(() => {
    return [
      notificationStyles.notification,
      notificationStyles[`notification-${notification.type}`]
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(
        setAppNotification({ timeout: 5000, message: '', type: 'error' })
      );
    }, notification.timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className={classes.join(' ')}>{notification.message}</div>;
};
