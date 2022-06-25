import { faRotate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC, useMemo } from 'react'
import { useDispatch } from 'react-redux'
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentFreeShip])
    
  return (
    <div key={elem.id} className={`battship-elem size_${elem.size} ${elem.direction} ${currentClass}`} onClick={onChooseElem}>
    { elem.size > 1 && <button className='battship-elembtn' onClick={changeDirection}><FontAwesomeIcon icon={faRotate}/></button>}
    </div>
  )
}
