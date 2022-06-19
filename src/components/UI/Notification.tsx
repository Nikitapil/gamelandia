import React, { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { setAppNotification } from '../../redux/appStore/appActions'
import { appSelector } from '../../redux/appStore/appSelectors'
import '../../styles/notification.scss'



export const Notification = () => {
    const {notification} = useTypedSelector(appSelector)
    const dispatch = useDispatch()

    const classes = useMemo(() => { 
        return ['notification', `notification-${notification.type}`]
    }, [])

    useEffect(() => {
        setTimeout(() => {
            dispatch(setAppNotification({timeout: 5000, message: '', type: 'error'}))
        }, notification.timeout)
    }, [])

   

  return (
    <div className={classes.join(' ')}>{notification.message}</div>
  )
}
