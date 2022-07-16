import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import commonStyles from '../../styles/common.module.scss'


interface WinnerCommonProps {
    winner: string;
    page: string
}

export const WinnerCommon:FC<WinnerCommonProps> = ({winner, page}) => {
  return (
    <div className={`contaiтук ${commonStyles.winner__container}`}>
        <h2 className={commonStyles.winner__title}>The winner is {winner}</h2>
        <Link className={commonStyles.link} to={page}>
          Go to Rooms
        </Link>
      </div>
  )
}
