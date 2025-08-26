import React from "react";
import { Link } from "react-router-dom";   
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        
        <div className={styles.logo}>
          <Link to="/">Logo</Link>
        </div>
        
        <div className={styles.rightGroup}>
          <nav className={styles.navLinks}>
            <Link to="/">Home</Link>
            <Link to="/cursos">Cursos</Link>
            <Link to="/sobre">Sobre Nós</Link>
          </nav>
          <div className={styles.loginButton}>
            <Link to="/login">Login</Link>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;