import React, { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'
import commonStyles from '../../styles/common.module.scss'


interface WinnerCommonProps {
    winner: string;
    page: string
}

export const WinnerCommon:FC<WinnerCommonProps> = ({winner, page}) => {
  const {t} = useTranslation()
  return (
    <div className={`container ${commonStyles.winner__container}`}>
        <h2 className={commonStyles.winner__title}>{t('the_winner_is')} {winner}</h2>
        <Link className={commonStyles.link} to={page}>
          {t('go_to_rooms')}
        </Link>
      </div>
  )
}
