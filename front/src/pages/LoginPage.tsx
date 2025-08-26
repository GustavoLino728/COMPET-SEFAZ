import React, { useState } from "react";  
import styles from "./LoginPage.module.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className={styles.pageContainer}>
      <form className={styles.formContainer}>
        <h1>Seu caminho começa agora.</h1>
        <p>Simples, prático e do seu jeito.</p>

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
          <label htmlFor="password">Senha</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Digite sua Senha" 
            className={styles.inputField}
          />
        </div>

         <Link to="/esqueci-senha" className={styles.forgotPasswordLink}>
          Esqueceu a senha?
        </Link>

        <button type="submit" className={styles.submitButton}>Entrar</button>

        <div className={styles.registerContainer}>

          <Link to="/cadastro" className={styles.registerButton}>
            Cadastre-se
          </Link> 

        </div>
      </form>
    </div>
  );
};

export default LoginPage;