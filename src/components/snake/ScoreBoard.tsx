import { User } from 'firebase/auth';
import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/store/useTypedSelector';
import { fetchSnakeBestScoore } from '../../redux/snake/snake-actions';
import { snakeSelector } from '../../redux/snake/snake-selector';
import snakeStyle from '../../styles/snake.module.scss';

interface ScoreBoardProps {
  user: User | null | undefined;
}

export const ScoreBoard = memo(({ user }: ScoreBoardProps) => {
  const { allBestScores, myBestScores } = useTypedSelector(snakeSelector);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchSnakeBestScoore());
  }, [dispatch, user]);

  return (
    <div className={snakeStyle['score-board']}>
      <div className={snakeStyle['score-board__item']}>
        <h3 className={snakeStyle['score-board__title']}>
          {t('your_best_scores')}
        </h3>
        <p className={snakeStyle['score-board_value']}>
          <span>Easy</span> {myBestScores?.easy}
        </p>
        <p className={snakeStyle['score-board_value']}>
          <span>Medium</span> {myBestScores?.medium}
        </p>
        <p className={snakeStyle['score-board_value']}>
          <span>Hard</span> {myBestScores?.hard}
        </p>
      </div>
      <div className={snakeStyle['score-board__item']}>
        <h3 className={snakeStyle['score-board__title']}>
          {t('all_best_scores')}
        </h3>
        <p className={snakeStyle['score-board_value']}>
          <span>Easy</span> {allBestScores?.easy}
        </p>
        <p className={snakeStyle['score-board_value']}>
          <span>Medium</span> {allBestScores?.medium}
        </p>
        <p className={snakeStyle['score-board_value']}>
          <span>Hard</span> {allBestScores?.hard}
        </p>
      </div>
    </div>
  );
});
