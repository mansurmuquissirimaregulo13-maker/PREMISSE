import React from 'react';

interface HeaderProps {
  balance: number;
}

const Header: React.FC<HeaderProps> = ({ balance }) => {
  return (
    <header className="header slide-in">
      <div className="logo-container">
        <div className="logo-box">P</div>
        <div className="logo-text">
          <span className="logo-title">Premise</span>
          <span className="logo-subtitle">DATA NETWORK</span>
        </div>
      </div>
      <div className="balance-badge">
        R {balance.toLocaleString('pt-BR')}
      </div>
    </header>
  );
};

export default Header;
