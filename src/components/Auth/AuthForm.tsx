import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import authStyles from '../../styles/auth.module.scss'
interface AuthFormProps {
  formTitle: string;
  submit: (email: string, password: string) => void;
  isSignUp?: boolean;
  setDisplayName?: (params: { displayName: string }) => void;
}

export const AuthForm: FC<AuthFormProps> = ({
  formTitle,
  submit,
  isSignUp = false,
  setDisplayName,
}) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [userName, setUserName] = useState("");
  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const {t} = useTranslation()

  const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setDisplayName) {
      setUserName(e.target.value);
    }
  };

  useEffect(() => {
    if (setDisplayName) {
      setDisplayName({ displayName: userName });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(formData.email, formData.password);
  };

  return (
    <form className={authStyles['auth-form']} onSubmit={onSubmit}>
      <h2 className={authStyles['auth-form__title']}>{formTitle}</h2>
      <input
        className={authStyles['auth-form__input']}
        type="email"
        data-testid='email-input'
        placeholder={t('your_email')}
        name="email"
        value={formData.email}
        onChange={onInput}
      />
      <input
        className={authStyles['auth-form__input']}
        type="password"
        placeholder={t('your_password')}
        name="password"
        value={formData.password}
        onChange={onInput}
      />
      {isSignUp && (
        <input
          className={authStyles['auth-form__input']}
          type="text"
          data-testid='display-name'
          placeholder={t('your_name')}
          required
          name="displayName"
          value={userName}
          onChange={onChangeUserName}
        />
      )}
      <button className={authStyles['auth-form__button']} type="submit" data-testid='submit'>
        {formTitle}
      </button>
    </form>
  );
};
