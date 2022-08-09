import { User } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { fetchInvadersScores } from "../../redux/invaders/invadersActions";
import { invadersSelector } from "../../redux/invaders/invadersSelector";
import invadersStyles from "../../styles/invaders.module.scss";

interface InvadersScoreBoardProps {
  user: User;
}

export const InvadersScoreBoard = ({ user }: InvadersScoreBoardProps) => {
  const dispatch = useDispatch();
  const { scores } = useTypedSelector(invadersSelector);

  useEffect(() => {
    dispatch(fetchInvadersScores());
  }, [dispatch]);

  return (
    <div className={invadersStyles["score-board"]}>
      <h3 className={invadersStyles["score-board__title"]}>Best Scores</h3>
      {scores?.map((score) => {
        return (
          <p
            className={`${invadersStyles["score-board_value"]} ${
              user.uid === score.uid ? invadersStyles["my-score"] : ""
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
