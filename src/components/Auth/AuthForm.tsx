import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface AuthFormProps {
    formTitle: string
    submit: (email:string, password:string) => void
}

export const AuthForm:FC<AuthFormProps> = ({formTitle, submit}) => {
    const [formData, setFormData] = useState({email: '', password: ''})

    const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        submit(formData.email, formData.password)
    }

  return (
    <form className='auth-form' onSubmit={onSubmit}>
        <h2 className='auth-form__title'>{formTitle}</h2>
        <input className='auth-form__input' type="email" placeholder='Your email' name='email' value={formData.email} onChange={onInput} />
        <input className='auth-form__input' type="password" placeholder='Your password' name='password' value={formData.password} onChange={onInput} />
        <button className='auth-form__button' type='submit'>{formTitle}</button>
    </form>
  )
}
