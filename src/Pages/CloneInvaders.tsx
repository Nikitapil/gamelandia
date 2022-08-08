import React from "react";
import { InvadersField } from "../components/CloneInvaders/InvadersField";
import { breadcrumbs } from "../constants/breadcrumbs";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import { useTitle } from "../hooks/useTitle";
import invadersStyles from "../styles/invaders.module.scss";
export const CloneInvaders = () => {
  useTitle("Clone Invaders");
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.cloneInvaders]);
  return (
    <div className={`container ${invadersStyles.invaders}`}>
      <h2 className="page-title">Clone invaders</h2>
      <InvadersField />
    </div>
  );
};
