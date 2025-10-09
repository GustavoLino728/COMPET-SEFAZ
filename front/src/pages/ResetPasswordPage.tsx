import React, { useState, useEffect } from "react";
import styles from "./ResetPasswordPage.module.css";
import { resetPassword } from "../api";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validações antes de enviar
    if (!email.trim()) {
      setError("Por favor, insira um email.");
      return;
    }
    
    if (!validateEmail(email)) {
      setError("Por favor, insira um email válido.");
      return;
    }
    
    setLoading(true);
    
    try {
      await resetPassword({ email: email.trim() });
      setSuccess(true);
      setCooldown(120); // 2 minutos de cooldown
      
      // Esconder mensagem de sucesso após 5 segundos
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
      
    } catch (err: any) {
      let errorMessage = "Erro ao enviar o link. Tente novamente.";
      
      // Tratamento específico para erros do Djoser
      if (err.response?.data) {
        if (err.response.data.email) {
          errorMessage = Array.isArray(err.response.data.email) 
            ? err.response.data.email[0] 
            : err.response.data.email;
        } else if (err.response.data.detail) {
          errorMessage = err.response.data.detail;
        } else if (err.response.data.non_field_errors) {
          errorMessage = Array.isArray(err.response.data.non_field_errors)
            ? err.response.data.non_field_errors[0]
            : err.response.data.non_field_errors;
        }
      }
      
      // Tratar mensagens comuns do backend
      if (errorMessage.toLowerCase().includes('user with this email does not exist')) {
        errorMessage = "Não encontramos nenhuma conta com este email.";
      }
      
      setError(errorMessage);
      console.error('Erro no reset de senha:', err);
      
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Limpar erro quando usuário começar a digitar novamente
    if (error) {
      setError("");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        {/* Mensagem de sucesso flutuante */}
        {success && (
          <div className={styles.successToast}>
            ✅ Email enviado com sucesso! Verifique sua caixa de entrada.
          </div>
        )}

        <h2>Esqueci minha senha</h2>
        <p>
          Insira seu email cadastrado para receber o link de redefinição de senha.
        </p>

        {error && <p className={styles.errorText}>{error}</p>}

        <input
          type="email"
          placeholder="Digite seu email"
          className={styles.inputField}
          value={email}
          onChange={handleEmailChange}
          required
          disabled={loading || cooldown > 0}
          autoComplete="email"
        />

        <button
          type="submit"
          className={styles.submitButton}
          disabled={cooldown > 0 || loading}
        >
          {loading 
            ? "Enviando..." 
            : cooldown > 0 
              ? `Aguarde ${cooldown}s` 
              : "Enviar link"
          }
        </button>

        {cooldown > 0 && (
          <p className={styles.cooldownText}>
            Você poderá solicitar um novo email em {cooldown}s
          </p>
        )}

        {success && (
          <div className={styles.successInfo}>
            <p>
              📧 Se o email estiver cadastrado em nossa base, você receberá 
              as instruções para redefinir sua senha em alguns minutos.
            </p>
            <p>
              Não esqueça de verificar sua pasta de spam/lixo eletrônico.
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default ResetPasswordPage;