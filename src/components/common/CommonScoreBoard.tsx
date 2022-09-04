import { User } from "firebase/auth";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { EGamesWithScoreBoard } from "../../domain/scoreTypes";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { fetchBoardScores } from "../../redux/score/scoreActions";
import { scoreSelector } from "../../redux/score/scoreSelector";
import commonStyles from "../../styles/common.module.scss";
interface CommonScoreBoardProps {
  user: User;
  game: EGamesWithScoreBoard;
}

export const CommonScoreBoard = ({ user, game }: CommonScoreBoardProps) => {
  const dispatch = useDispatch();
  const { scores } = useTypedSelector(scoreSelector);
  const {t} = useTranslation()
  useEffect(() => {
    dispatch(fetchBoardScores(game));
  }, [dispatch, game]);

  return (
    <div className={commonStyles["score-board"]}>
      <h3 className={commonStyles["score-board__title"]}>{t('scores')}</h3>
      {scores?.map((score) => {
        return (
          <p
            className={`${commonStyles["score-board_value"]} ${
              user.uid === score.uid ? commonStyles["my-score"] : ""
            }`}
            key={Math.random()}
          >
            <span>{score.name}</span>
            <span>{score.score}</span>
          </p>
        );
      })}
    </div>
  );
};
