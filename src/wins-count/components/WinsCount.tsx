import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppButton } from '../../components/UI/AppButton/AppButton';
import { ModalContainer } from '../../components/UI/ModalContainer/ModalContainer';
import { Winner } from './Winner';
import styles from '../assets/styles/winners.module.scss';
import { useAppSelector } from '../../hooks/useAppSelector';
import { authSelector, winnersSelector } from '../../store/selectors';
import { useWinnersActions } from '../hooks/useWinnersActions';
import { EGamesNames } from '../../games/constants';

interface IWinsCountProps {
  gameName: EGamesNames;
}

export const WinsCount = ({ gameName }: IWinsCountProps) => {
  const { t } = useTranslation();

  const [isShowWinnersModal, setIsShowWinnersModal] = useState(false);

  const { isWinnersLoading, winners } = useAppSelector(winnersSelector);
  const { user } = useAppSelector(authSelector);

  const { getWinners } = useWinnersActions();

  const open = useCallback(() => {
    setIsShowWinnersModal(true);
  }, []);

  const close = useCallback(() => {
    setIsShowWinnersModal(false);
  }, []);

  useEffect(() => {
    getWinners(gameName);
  }, [gameName, getWinners]);

  if (isWinnersLoading || !winners.length) {
    return null;
  }

  return (
    <div>
      <AppButton
        text={t('winners_table')}
        onClick={open}
        color="dark"
      />
      <ModalContainer
        closeModal={close}
        isOpened={isShowWinnersModal}
        title={t('top_winners')}
      >
        <div className={styles['winners-container']}>
          {winners.map((winner) => (
            <Winner
              key={winner.id}
              winner={winner}
              isMe={user?.id === winner.userId}
            />
          ))}
        </div>
      </ModalContainer>
    </div>
  );
};
