import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import commonStyles from '../../styles/common.module.scss'
interface FullRoomMessageProps {
    page: string
}

export const FullRoomMessage:FC<FullRoomMessageProps> = ({page}) => {
  return (
    <h2 className={commonStyles['full-message']}>
        The room is full please choose another one or create new.
        <Link className={commonStyles['message-link']} to={page}>
           Go to Rooms
        </Link>
      </h2>
  )
}
