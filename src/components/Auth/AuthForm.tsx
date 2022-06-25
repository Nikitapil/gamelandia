import React, { FC, useEffect, useState } from "react";

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
    <form className="auth-form" onSubmit={onSubmit}>
      <h2 className="auth-form__title">{formTitle}</h2>
      <input
        className="auth-form__input"
        type="email"
        placeholder="Your email"
        name="email"
        value={formData.email}
        onChange={onInput}
      />
      <input
        className="auth-form__input"
        type="password"
        placeholder="Your password"
        name="password"
        value={formData.password}
        onChange={onInput}
      />
      {isSignUp && (
        <input
          className="auth-form__input"
          type="text"
          placeholder="Your name"
          required
          name="displayName"
          value={userName}
          onChange={onChangeUserName}
        />
      )}
      <button className="auth-form__button" type="submit">
        {formTitle}
      </button>
    </form>
  );
};
