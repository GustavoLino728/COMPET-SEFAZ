import React, { useState } from "react";  
import styles from "./LoginPage.module.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className={styles.pageContainer}>
      <form className={styles.formContainer}>
        <h2>Bem Vindo de volta</h2>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            placeholder="Digite seu Email" 
            className={styles.inputField}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Digite sua Senha" 
            className={styles.inputField}
          />
        </div>

         <Link to="/esqueci-senha" className={styles.forgotPasswordLink}>
          Esqueceu sua senha?
        </Link>

        <button type="submit" className={styles.submitButton}>Log In</button>
      </form>
    </div>
  );
};

export default LoginPage;