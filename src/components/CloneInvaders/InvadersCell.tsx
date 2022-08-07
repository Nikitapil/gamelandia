import React, { useEffect, useMemo } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpaghettiMonsterFlying } from "@fortawesome/free-solid-svg-icons";
import invadersStyles from '../../styles/invaders.module.scss'
import { InvadersCellModel } from '../../models/cloneInvaders/InvadersCellModel';

interface InvadersCellProps {
    cell: InvadersCellModel
}

export const InvadersCell = ({cell} : InvadersCellProps) => {

    const cellStyle = useMemo(() => {
        return {
            top: cell.y + 'px',
            left: cell.x + 'px'
        }
    }, [cell.x])

    useEffect(() => {
        if (cell.isWithElem) {
            if (cell.x >= 555 || (cell.x <= 0 && !cell.field.isFirstMove)) {
                cell.changeDirection()
            }
        }
    }, [cell.x])

  return (
    <div className={invadersStyles.cell} style={cellStyle}>
        <FontAwesomeIcon icon={faSpaghettiMonsterFlying} />
    </div>
  )
}
