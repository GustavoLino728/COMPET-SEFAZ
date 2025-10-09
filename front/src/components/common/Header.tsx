import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";   
import styles from './Header.module.css';
import logoColorida from '../../assets/images/Logo/PNG/Logo-colorida.png'; 

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setLoggedIn(!!token);
  }, []);

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
            {loggedIn ? (
              <Link to="/perfil">Acessar Perfil</Link>
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