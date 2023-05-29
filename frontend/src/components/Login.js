import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

export default function Login({ handleLogin }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    handleLogin(formValue.email, formValue.password);
  }

  return (
    <>
      <Header>
        <Link to='/sign-up' className='header__button'>Регистрация</Link>
      </Header>
      <div className='login'>
        <div className="login__container">
          <h2 className="login__title">Вход</h2>
          <form name='login__form'
            className="login__form"
            onSubmit={handleSubmit}>
            <input type="email"
              className="login__input login__input_type_email"
              name="email"
              id="loginEmail"
              placeholder="Email"
              value={formValue.email}
              onChange={handleChange} required />
            <span className="login__input-error loginEmail-error"></span>
            <input type="password"
              className="login__input login__input_type_password"
              name="password"
              id="loginPassword"
              placeholder="Пароль"
              value={formValue.password}
              onChange={handleChange} required />
            <span className="login__input-error loginPassword-error"></span>
            <button className="login__submit-button" type="submit">Войти</button>
          </form>
        </div>
      </div>
    </>
  )
}
