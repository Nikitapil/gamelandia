import React, { FC } from 'react'
import { Auth } from "firebase/auth";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useDispatch } from 'react-redux';
import { setAppNotification } from '../redux/appStore/appActions';
import { authErrorMessages } from '../constants/appMessages';
import { AuthForm } from '../components/Auth/AuthForm';
import { Link } from 'react-router-dom';


interface SignInProps {
    auth: Auth;
}

export const SignIn:FC<SignInProps> = ({auth}) => {
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
  const dispatch = useDispatch();

  const submit = async (email: string, password: string) => {
    await signInWithEmailAndPassword(email, password);
    if (error) {        
        dispatch(setAppNotification({timeout: 5000, message:authErrorMessages[error.code], type: 'error' }))
    }
  };

  return (
    <div className="auth-container">
      <AuthForm formTitle="Sign In" submit={submit} />
      <Link className='auth-link' to='/registration'>Not registered yet? Just do it.</Link>
    </div>
  );
}
