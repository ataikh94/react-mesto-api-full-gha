import React from 'react';
import logoPath from '../images/logo.svg';

function Header({ children }) {
  return (
    <header className="header">
      <img src={logoPath} alt="Логотип" className="header__logo" />
      {children}
    </header>
  );
}

export default Header;