import React, { useEffect, useMemo } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpaghettiMonsterFlying } from "@fortawesome/free-solid-svg-icons";
import invadersStyles from '../../styles/invaders.module.scss'
import { InvadersCellModel } from '../../models/cloneInvaders/InvadersCellModel';
import { InvadersBulletModel } from '../../models/cloneInvaders/InvadersBulletModel';
import { EInvadersDirections } from '../../domain/invadersTypes';

interface InvadersCellProps {
    cell: InvadersCellModel,
    bullet: InvadersBulletModel|null,
    destroyBullet: () => void,
    increaseScore: () => void,
    gameOver: () => void
}

export const InvadersCell = ({cell, bullet, destroyBullet, increaseScore, gameOver} : InvadersCellProps) => {

    const cellStyle = useMemo(() => {
        return {
            top: cell.y + 'px',
            left: cell.x + 'px'
        }
    }, [cell.x, cell.y])

    useEffect(() => {
        if (cell.isWithElem) {
            if ((cell.x >= 555 && cell.field.direction === EInvadersDirections.RIGHT) || (cell.x <= 0 && !cell.field.isFirstMove && cell.field.direction === EInvadersDirections.LEFT)) {
                cell.changeDirection()
            }
            if (cell.y >= 340) {
                gameOver()
            }
        }
    }, [cell.x, cell])

    useEffect(() => {
        if (bullet && cell.isWithElem) {
            const inTheArea = bullet.x >= cell.x && bullet.x <= cell.cellEnd.xEnd && bullet.y <= 400 - cell.y && bullet.y >= 400 - cell.cellEnd.yEnd
            if (inTheArea) {
                cell.destroyElem()
                destroyBullet()
                increaseScore()
            }
        }
    }, [bullet])

  return (
    <div className={invadersStyles.cell} style={cellStyle}>
        {cell.isWithElem && <FontAwesomeIcon icon={faSpaghettiMonsterFlying} />}
    </div>
  )
}
