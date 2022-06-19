import React, { FC } from "react";
import { AuthForm } from "../components/Auth/AuthForm";
import "../styles/auth.scss";
import { Auth } from "firebase/auth";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { setAppNotification } from "../redux/appStore/appActions";
import { authErrorMessages } from "../constants/appMessages";

interface SignUpProps {
  auth: Auth;
}

export const SignUp: FC<SignUpProps> = ({ auth }) => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const dispatch = useDispatch();

  const submit = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(email, password);
    if (error) {
        console.log(error);
        
        dispatch(setAppNotification({timeout: 5000, message:authErrorMessages[error.code], type: 'error' }))
    }
  };

  return (
    <div className="auth-container">
      <AuthForm formTitle="Sign Up" submit={submit} />
    </div>
  );
};
