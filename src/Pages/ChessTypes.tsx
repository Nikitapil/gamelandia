import React from "react";
import { Link } from "react-router-dom";
import { breadcrumbs } from "../constants/breadcrumbs";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import "../styles/chess.scss";
export const ChessTypes = () => {
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.chessTypes]);
  return (
    <div className="chess-types">
      <Link to="/chess/rooms" className="chessTypes__item">
        Online
      </Link>
      <Link to="/chess/offline" className="chessTypes__item">
        Offline
      </Link>
    </div>
  );
};
