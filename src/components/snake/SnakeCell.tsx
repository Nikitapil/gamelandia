import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC, useMemo } from 'react'
import { SnakeCellModel } from '../../models/snake/SnakeCellModel'
import {faAppleWhole} from "@fortawesome/free-solid-svg-icons";
interface SnakeCellProps {
    cell:SnakeCellModel
}



export const SnakeCell:FC<SnakeCellProps> = ({cell}) => {

    const classes = useMemo(() => {
        const base = 'snake-cell'
        if(cell.elem) {
            return `${base} with-snake`
        }
        return base
    }, [cell.elem])

  return (
    <div className={classes}>{cell.food && <FontAwesomeIcon icon={faAppleWhole}/>}</div>
  )
}
