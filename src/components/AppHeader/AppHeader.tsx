import React, { FC } from "react";
import { Link } from "react-router-dom";
import "../../styles/header.scss";
import { Auth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { HorizotalLoader } from "../UI/Loaders/HorizotalLoader";
interface AppHeaderProps {
  auth: Auth;
}

export const AppHeader: FC<AppHeaderProps> = ({ auth }) => {
  const [user, loading, error] = useAuthState(auth);

  const onSignOut = async() => {
      await signOut(auth)
  }

  return (
    <header className="header">
      <div className="container header__container">
        <h1 className="header__title">GameLandia</h1>
        <nav className="header__nav-bar nav-bar">
          <ul className="nav-bar__links">
            <li>
              <Link className="nav-bar__link" to="/">
                Main
              </Link>
            </li>
            {loading ? (
              <li>
                <HorizotalLoader />
              </li>
            ) : !user ? (
              <React.Fragment>
                <li>
                  <Link className="nav-bar__link" to="/login">
                    Sign in
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link className="nav-bar__link" to="/registration">
                    Sign up
                  </Link>
                </li>
              </React.Fragment>
            ) : (
              <li>
                {" "}
                <button className="logout-btn" onClick={onSignOut}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
