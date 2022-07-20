import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Auth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { HorizotalLoader } from "../UI/Loaders/HorizotalLoader";
import headerStyles from '../../styles/header.module.scss'
interface AppHeaderProps {
  auth: Auth;
}

export const AppHeader: FC<AppHeaderProps> = ({ auth }) => {
  const [user, loading] = useAuthState(auth);

  const onSignOut = async () => {
    await signOut(auth);
  };

  return (
    <header className={headerStyles.header}>
      <div className={`container ${headerStyles.header__container}`}>
        <h1 className={headerStyles.header__title}>GameLandia</h1>
        <nav className={headerStyles['header__nav-bar']}>
          <ul className={headerStyles['nav-bar__links']}>
            <li>
              <Link className={headerStyles['nav-bar__link']} to="/">
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
                  <Link className={headerStyles['nav-bar__link']} to="/login">
                    Sign in
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link className={headerStyles['nav-bar__link']} to="/registration">
                    Sign up
                  </Link>
                </li>
              </React.Fragment>
            ) : (
              <li>
                {" "}
                <button className={headerStyles['logout-btn']} onClick={onSignOut}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
