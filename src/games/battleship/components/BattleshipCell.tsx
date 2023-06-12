import React, { memo, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faXmark } from '@fortawesome/free-solid-svg-icons';
import { BattleshipCellModel } from '../models/BattleShipCellModel';
import styles from '../assets/styles/battleship.module.scss';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { battleshipSelector } from '../../../store/selectors';
import { useBattleshipActions } from '../hooks/useBattleshipActions';
import { TBattleshipRoomData, TPlayerKey } from '../helpers/types';
import { useBattleshipService } from '../hooks/useBattleshipService';
import { useUpdateWinsCount } from '../../../wins-count/hooks/useUpdateWinsCount';
import { EGamesNames } from '../../constants';

interface IBattleshipCellProps {
  cell: BattleshipCellModel;
  roomData: TBattleshipRoomData;
  secondPlayer: TPlayerKey;
}

export const BattleshipCell = memo(({ cell, roomData, secondPlayer }: IBattleshipCellProps) => {
  const { currentFreeShip, board, enemyBoard } = useAppSelector(battleshipSelector);

  const { setBoard, setFreeShips, setCurrentFreeShip } = useBattleshipActions();

  const service = useBattleshipService();

  const updateWinsCount = useUpdateWinsCount();

  const onMouseOver = () => {
    if (currentFreeShip && cell.isEmpty) {
      const isAddAvailable = board?.checkIsAddAvailable(cell, currentFreeShip);
      if (isAddAvailable) {
        board?.highlightCells(cell, currentFreeShip);
      }
      setBoard(board);
    }
  };

  const onClick = () => {
    if (currentFreeShip && cell.isAddAvailable) {
      board?.addShipOnBoard(cell, currentFreeShip);
      setBoard(board);
      setFreeShips(board?.freeElems!);
      setCurrentFreeShip(null);
    }
    if (cell.board.isEnemyBoard && roomData.currentPlayer !== secondPlayer && !cell.isAttacked) {
      cell.setIsAttacked();
      const isWinner = !!enemyBoard?.checkWinner();
      service.attackCell({
        roomData,
        isWinner,
        playerToAttack: secondPlayer,
        playerToAttackCells: enemyBoard?.cells || [],
        playerToAttackShips: enemyBoard?.ships || [],
        isSuccessfullAtack: !!cell.elem
      });
      if (isWinner) {
        updateWinsCount({
          gameName: EGamesNames.BATTLESHIP
        });
      }
    }
  };

  const icon = useMemo(() => {
    if (cell.isAttacked) {
      return cell.elem
        ? {
            className: styles['battleship__under-attack'],
            icon: faXmark
          }
        : { className: styles.battleship__missed, icon: faCircle };
    }
    return null;
  }, [cell.elem, cell.isAttacked]);

  const className = useMemo(() => {
    const classes = [styles.battleship__cell];
    if (cell.isAddAvailable) {
      classes.push(styles['battship-highlighted']);
    }
    if (cell.elem && !cell.board.isEnemyBoard) {
      classes.push(styles['with-ship']);
    }
    if (cell.elem?.isDestroyed) {
      classes.push(styles.battleship__destroyed);
    }
    return classes.join(' ');
  }, [cell.board.isEnemyBoard, cell.elem, cell.isAddAvailable]);

  return (
    <div
      className={className}
      onMouseOver={onMouseOver}
      onClick={onClick}
    >
      {icon && <FontAwesomeIcon {...icon} />}
    </div>
  );
});
