import { User } from "firebase/auth";
import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { fetchSnakeBestScoore } from "../../redux/snake/snakeActions";
import { snakeSelector } from "../../redux/snake/snakeSelector";

interface ScoreBoardProps {
  user: User | null | undefined;
}

export const ScoreBoard: FC<ScoreBoardProps> = ({ user }) => {
  const { allBestScores, myBestScores } = useTypedSelector(snakeSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSnakeBestScoore());
  }, [user]);

  return (
    <div className="score-board">
      <div className="score-board__item">
        <h3 className="score-board__title">Your best scores</h3>
        <p className="score-board_value">
          <span>Easy</span> {myBestScores?.easy}
        </p>
        <p className="score-board_value">
          <span>Medium</span> {myBestScores?.medium}
        </p>
        <p className="score-board_value">
          <span>Hard</span> {myBestScores?.hard}
        </p>
      </div>
      <div className="score-board__item">
        <h3 className="score-board__title">All best scores</h3>
        <p className="score-board_value">
          <span>Easy</span> {allBestScores?.easy}
        </p>
        <p className="score-board_value">
          <span>Medium</span> {allBestScores?.medium}
        </p>
        <p className="score-board_value">
          <span>Hard</span> {allBestScores?.hard}
        </p>
      </div>
    </div>
  );
};
