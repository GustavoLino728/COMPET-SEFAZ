import React, { useState, useEffect } from "react";  
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, logoutUser, verifyToken } from "../api";
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleLogoutOnEntry = async () => {
      try {
        const isValidToken = await verifyToken();
        
        if (isValidToken) {
          logoutUser();
          console.log('Logout automático realizado - usuário estava logado');
        }
      } catch (error) {
        logoutUser();
        console.log('Limpeza de tokens realizada');
      }
    };

    handleLogoutOnEntry();
  }, []);

  const validateForm = () => {
    if (!email.trim()) {
      setError("Por favor, insira seu email.");
      return false;
    }
    if (!password.trim()) {
      setError("Por favor, insira sua senha.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await loginUser({ email: email.trim(), password });
      login();
      navigate("/");
    } catch (err: any) {
      let errorMessage = "Email ou senha inválidos.";

      if (err.response?.data) {
        if (err.response.data.detail) {
          errorMessage = err.response.data.detail;
        } else if (err.response.data.non_field_errors) {
          errorMessage = Array.isArray(err.response.data.non_field_errors)
            ? err.response.data.non_field_errors[0]
            : err.response.data.non_field_errors;
        }
      }
      
      setError(errorMessage);
      console.error('Erro no login:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      if (error) setError("");
    };

  return (
    <div className={styles.pageContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h1>Seu caminho começa agora.</h1>
        <p>Simples, prático e do seu jeito.</p>

        {error && <p className={styles.errorText}>{error}</p>}

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            placeholder="Digite seu Email" 
            className={styles.inputField}
            value={email}
            onChange={handleInputChange(setEmail)}
            disabled={loading}
            autoComplete="email"
            required
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
            onChange={handleInputChange(setPassword)}
            disabled={loading}
            autoComplete="current-password"
            required
          />
        </div>

        <Link to="/esqueci-senha" className={styles.forgotPasswordLink}>
          Esqueceu a senha?
        </Link>

        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

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
