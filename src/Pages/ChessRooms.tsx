import { Auth } from 'firebase/auth';
import { collection, doc, Firestore, setDoc } from 'firebase/firestore';
import React, { FC, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useTranslation } from 'react-i18next';
import { TimerModal } from '../components/Chess/TimerModal';
import { RoomsCommon } from '../components/common/RoomsCommon';
import { ModalContainer } from '../components/UI/ModalContainer';
import { breadcrumbs } from '../constants/breadcrumbs';
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import { useTitle } from '../hooks/useTitle';
import '../styles/chess.scss';

interface ChessRoomsProps {
  firestore: Firestore;
  auth: Auth;
}

export const ChessRooms: FC<ChessRoomsProps> = ({ firestore, auth }) => {
  const { t } = useTranslation();
  useTitle(t('chess'));
  useBreadcrumbs([
    breadcrumbs.main,
    breadcrumbs.chessTypes,
    breadcrumbs.chessRooms
  ]);
  const [rooms] = useCollectionData(collection(firestore, 'chess'));
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
      winner: '',
      isGameStarted: false,
      id: `room_${(rooms?.length || 0) + 1}`,
      name: `Room ${(rooms?.length || 0) + 1}`
    };
    await setDoc(doc(firestore, 'chess', newRoom.id), newRoom);
  };

  return (
    <div className="chess">
      <RoomsCommon
        rooms={rooms}
        auth={auth}
        page="chess/rooms"
        createRoom={toggleModal}
      />
      {isModalOpen && (
        <ModalContainer closeModal={toggleModal} title="Set time of the Game">
          <TimerModal closeModal={toggleModal} start={createRoom} />
        </ModalContainer>
      )}
    </div>
  );
};
