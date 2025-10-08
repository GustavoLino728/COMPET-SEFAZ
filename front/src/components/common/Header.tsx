import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from './Header.module.css';
import logoColorida from '../../assets/images/Logo/PNG/Logo-colorida.png'; 
import { useAuth } from '../../contexts/AuthContext';
import styled from "styled-components";

const ProfileButton = styled.button`
  background-color: #5e60ce;
  color: #fff;
  border: none;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #4c4eb8;
  }
`;

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();
  
  const isOnProfilePage = location.pathname === '/perfil';

  const handleLogout = () => {
    logout();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        
       <div className={styles.logo}>
        <Link to="/">
           <img src={logoColorida} alt="Logo Fiscolab" className={styles.logoImage} />
        </Link>
      </div>

        <div className={styles.rightGroup}>
          <nav className={styles.navLinks}>
            <Link to="/">Início</Link>
            <Link to="/trilhas">Trilhas</Link>
            <Link to="/teste-perfil">Teste de perfil</Link>
            <Link to="/certificados">Certificações</Link>
          </nav>

          <div className={styles.loginButton}>
            {isLoggedIn ? (
              isOnProfilePage ? (
                <button onClick={handleLogout} className={styles.logoutButton}>
                  Sair
                </button>
              ) : (
                <Link to="/perfil">
                  <ProfileButton>Acessar perfil</ProfileButton>
                </Link>
              )
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;