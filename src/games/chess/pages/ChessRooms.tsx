import { collection, doc, setDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useTranslation } from 'react-i18next';
import { TimerModal } from '../components/TimerModal';
import { RoomsCommon } from '../../components/RoomsCommon';
import { ModalContainer } from '../../../components/UI/ModalContainer/ModalContainer';
import { breadcrumbs } from '../../../constants/breadcrumbs';
import { useBreadcrumbs } from '../../../app/hooks/useBreadcrumbs';
import { useTitle } from '../../../hooks/useTitle';
import '../assets/styles/chess.scss';
import { FirebaseContext } from '../../../context/firebase-context/FirebaseContext';

export const ChessRooms = () => {
  const { t } = useTranslation();
  useTitle(t('chess'));
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.chessTypes, breadcrumbs.chessRooms]);
  const firestore = useContext(FirebaseContext);
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
