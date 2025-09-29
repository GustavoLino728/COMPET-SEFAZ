import React, { useState } from "react";  
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await loginUser({ email, password });
      navigate("/"); // rota após login
    } catch (err: any) {
      setError("Email ou senha inválidos");
      console.error(err);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h1>Seu caminho começa agora.</h1>
        <p>Simples, prático e do seu jeito.</p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            placeholder="Digite seu Email" 
            className={styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Senha</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Digite sua Senha" 
            className={styles.inputField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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