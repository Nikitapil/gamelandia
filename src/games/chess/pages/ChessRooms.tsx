import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TimerModal } from '../components/TimerModal';
import { RoomsCommon } from '../../components/RoomsCommon';
import { ModalContainer } from '../../../components/UI/ModalContainer/ModalContainer';
import { breadcrumbs } from '../../../constants/breadcrumbs';
import { useBreadcrumbs } from '../../../app/hooks/useBreadcrumbs';
import { useTitle } from '../../../hooks/useTitle';
import { useRoomsCollection } from '../../hooks/rooms/useRoomsCollection';
import { TChessRoomData } from '../helpers/types';
import styles from '../assets/styles/chess.module.scss';

export const ChessRooms = () => {
  const { t } = useTranslation();
  useTitle(t('chess'));
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.chessTypes, breadcrumbs.chessRooms]);

  const { rooms, createRoom: createChessRoom } = useRoomsCollection<TChessRoomData>('chess');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const createRoom = async (timer: number) => {
    const newRoom = {
      player1: null,
      player2: null,
      currentPlayer: null,
      time: {
        black: timer,
        white: timer
      },
      board: null,
      winner: null,
      isGameStarted: false,
      id: `room_${(rooms?.length || 0) + 1}`,
      name: `Room ${(rooms?.length || 0) + 1}`
    };
    await createChessRoom(newRoom);
  };

  return (
    <div className={styles.chess}>
      <RoomsCommon
        rooms={rooms}
        page="chess/rooms"
        createRoom={toggleModal}
      />
      <ModalContainer
        closeModal={toggleModal}
        title="Set time of the Game"
        isOpened={isModalOpen}
      >
        <TimerModal
          closeModal={toggleModal}
          start={createRoom}
        />
      </ModalContainer>
    </div>
  );
};
