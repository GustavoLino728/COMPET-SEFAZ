import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './RegisterPage.module.css';
import { registerUser } from "../api";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== rePassword) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      await registerUser({ name, email, linkedin, cpf, password, re_password: rePassword });
      navigate("/setup"); // rota após cadastro
    } catch (err: any) {
      setError("Erro ao cadastrar usuário");
      console.error(err);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <form className={styles.formContainer} onSubmit={handleRegisterSubmit}>
        <img src="" alt="Ícone de Cadeado" className={styles.formIcon}/>
        <h2>Cadastro</h2>
        <p>Dados pessoais</p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input type="text" placeholder="Nome Completo" className={styles.inputField} value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="Email" className={styles.inputField} value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="url" placeholder="LinkedIn (Opcional)" className={styles.inputField} value={linkedin} onChange={e => setLinkedin(e.target.value)} />
        <input type="text" placeholder="CPF" className={styles.inputField} value={cpf} onChange={e => setCpf(e.target.value)} required />
        <input type="password" placeholder="Senha" className={styles.inputField} value={password} onChange={e => setPassword(e.target.value)} required />
        <input type="password" placeholder="Confirme sua Senha" className={styles.inputField} value={rePassword} onChange={e => setRePassword(e.target.value)} required />
        
        <button type="submit" className={styles.submitButton}>Continuar...</button>
        
        <p className={styles.termsText}>Li e concordo com os <a href="/terms">Termos de Serviço</a> e <a href="/privacy">Política de Privacidade</a>.</p>
      </form>
    </div>
  );
};

export default RegisterPage;