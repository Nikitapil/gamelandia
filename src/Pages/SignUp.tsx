import React, { FC, useState } from "react";
import { AuthForm } from "../components/Auth/AuthForm";
import "../styles/auth.scss";
import { Auth } from "firebase/auth";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { setAppNotification } from "../redux/appStore/appActions";
import { authErrorMessages } from "../constants/appMessages";
import { useNavigate, useSearchParams } from "react-router-dom";

interface SignUpProps {
  auth: Auth;
}

export const SignUp: FC<SignUpProps> = ({ auth }) => {
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
          message: authErrorMessages[error.code],
          type: "error",
        })
      );
    }
    if (!error && searchParams.get("page")) {
      navigate(`/${searchParams.get("page")}`);
    }
  };

  return (
    <div className="auth-container">
      <AuthForm
        formTitle="Sign Up"
        submit={submit}
        isSignUp={true}
        setDisplayName={setDisplayName}
      />
    </div>
  );
};
