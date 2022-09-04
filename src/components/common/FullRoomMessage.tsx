import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import commonStyles from '../../styles/common.module.scss'
interface FullRoomMessageProps {
    page: string
}

export const FullRoomMessage:FC<FullRoomMessageProps> = ({page}) => {
  const {t} = useTranslation()
  return (
    <h2 className={commonStyles['full-message']}>
        {t('full_room_message')}
        <Link className={commonStyles['message-link']} to={page}>
           {t('go_to_rooms')}
        </Link>
      </h2>
  )
}
