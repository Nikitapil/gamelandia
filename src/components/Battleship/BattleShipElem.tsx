import { faRotate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { EBattleShipElemDirection } from '../../constants/battleship'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { BattleShipElemModel } from '../../models/battleship/BattleShipElemModel'
import { setCurrentFreeShip, setFreeShips } from '../../redux/battleships/battleshipActions'
import { battleShipSelector } from '../../redux/battleships/battleshipSelectors'

interface BattleShipElemProps {
    elem: BattleShipElemModel
}


export const BattleShipElem:FC<BattleShipElemProps> = ({elem}) => {
    const {board, currentFreeShip} = useTypedSelector(battleShipSelector)
    const dispatch = useDispatch()
    
    const changeDirection = (e: React.SyntheticEvent) => {
        e.stopPropagation()
        elem.changeDirection()
        dispatch(setFreeShips(board?.freeElems!))
    }

    const onChooseElem = () => {
        dispatch(setCurrentFreeShip(elem))
    }

    const currentClass = useMemo(() => {
        return elem.id === currentFreeShip?.id ? 'ship-selected' : ''
    }, [currentFreeShip])
    
  return (
    <div key={elem.id} className={`battship-elem size_${elem.size} ${elem.direction} ${currentClass}`} onClick={onChooseElem}>
    { elem.size > 1 && <button className='battship-elembtn' onClick={changeDirection}><FontAwesomeIcon icon={faRotate}/></button>}
    </div>
  )
}
