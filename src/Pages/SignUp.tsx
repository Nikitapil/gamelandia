import React, { FC, useState } from "react";
import { AuthForm } from "../components/Auth/AuthForm";
import authStyles from "../styles/auth.module.scss";
import { Auth } from "firebase/auth";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { setAppNotification } from "../redux/appStore/appActions";
import { authErrorMessages } from "../constants/appMessages";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import { breadcrumbs } from "../constants/breadcrumbs";
import { useTitle } from "../hooks/useTitle";
import { useTranslation } from "react-i18next";

interface SignUpProps {
  auth: Auth;
}

export const SignUp: FC<SignUpProps> = ({ auth }) => {
  const { t } = useTranslation()
  useTitle(t('sign_up'))
  useBreadcrumbs([breadcrumbs.main, breadcrumbs.registration]);
  const [createUserWithEmailAndPassword, , , error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile] = useUpdateProfile(auth);
  const [displayName, setDisplayName] = useState({ displayName: "" });
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const submit = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(email, password);
    if (!error && displayName) {
      await updateProfile(displayName);
    }
    if (error) {
      dispatch(
        setAppNotification({
          timeout: 5000,
          message: t(authErrorMessages[error.code]),
          type: "error",
        })
      );
    }
    if (!error && searchParams.get("page")) {
      navigate(`/${searchParams.get("page")}`);
    }
  };

  return (
    <div className={authStyles["auth-container"]} data-testid="signup-page">
      <AuthForm
        formTitle={t('sign_up')}
        submit={submit}
        isSignUp={true}
        setDisplayName={setDisplayName}
      />
    </div>
  );
};
