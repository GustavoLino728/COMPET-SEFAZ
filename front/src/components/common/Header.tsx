import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from './Header.module.css';
import logoColorida from '../../assets/images/Logo/PNG/Logo-colorida.png'; 
import { useAuth } from '../../contexts/AuthContext';

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
            <Link to="/certificacoes">Certificações</Link>
          </nav>

          <div className={styles.loginButton}>
            {isLoggedIn ? (
              isOnProfilePage ? (
                <button onClick={handleLogout} className={styles.logoutButton}>
                  Sair
                </button>
              ) : (
                <Link to="/perfil">Acessar Perfil</Link>
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