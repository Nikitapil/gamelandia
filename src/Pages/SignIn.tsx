import React, { FC, useMemo } from "react";
import { Auth } from "firebase/auth";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { setAppNotification } from "../redux/appStore/appActions";
import { authErrorMessages } from "../constants/appMessages";
import { AuthForm } from "../components/Auth/AuthForm";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import authStyles from "../styles/auth.module.scss";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import { breadcrumbs } from "../constants/breadcrumbs";
interface SignInProps {
  auth: Auth;
}

export const SignIn: FC<SignInProps> = ({ auth }) => {
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.login]);
  const [signInWithEmailAndPassword, , , error] =
    useSignInWithEmailAndPassword(auth);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (email: string, password: string) => {
    await signInWithEmailAndPassword(email, password);
    if (error) {
      dispatch(
        setAppNotification({
          timeout: 5000,
          message: authErrorMessages[error.code],
          type: "error",
        })
      );
    }
    if (!error && searchParams.get("page")) {
      navigate(`/${searchParams.get("page")}`);
    }
  };

  const registeredLink = useMemo(() => {
    if (searchParams.get("page")) {
      return `/registration?page=${searchParams.get("page")}`;
    }
    return "/registration";
  }, [searchParams]);

  return (
    <div className={authStyles["auth-container"]}>
      <AuthForm formTitle="Sign In" submit={submit} />
      <Link
        className={authStyles["auth-link"]}
        to={registeredLink}
        data-testid="signup-link"
      >
        Not registered yet? Just do it.
      </Link>
    </div>
  );
};
