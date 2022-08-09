import { Auth } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { InvadersField } from "../components/CloneInvaders/InvadersField";
import { InvadersScoreBoard } from "../components/CloneInvaders/InvadersScoreBoard";
import { breadcrumbs } from "../constants/breadcrumbs";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import { useTitle } from "../hooks/useTitle";
import invadersStyles from "../styles/invaders.module.scss";

interface CloneInvadersProps {
  auth: Auth;
}

export const CloneInvaders = ({ auth }: CloneInvadersProps) => {
  useTitle("Clone Invaders");
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.cloneInvaders]);
  const [user] = useAuthState(auth);
  return (
    <div className={`container ${invadersStyles.invaders}`}>
      <h2 className="page-title">Clone invaders</h2>
      <div className={invadersStyles.boards}>
        <InvadersField user={user} />
        {user && <InvadersScoreBoard user={user} />}
      </div>
    </div>
  );
};
