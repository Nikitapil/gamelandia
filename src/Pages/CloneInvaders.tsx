import React from 'react'
import { InvadersField } from '../components/CloneInvaders/InvadersField'
import invadersStyles from '../styles/invaders.module.scss'
export const CloneInvaders = () => {
  return (
    <div className={`container ${invadersStyles.invaders}`}>
        <h2 className="page-title">Clone invaders</h2>
        <InvadersField/>
    </div>
  )
}
