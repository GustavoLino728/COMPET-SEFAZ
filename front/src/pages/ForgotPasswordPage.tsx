import React, { useState, useEffect } from "react";
import styles from "./ForgotPasswordPage.module.css";
import { resetPassword } from "../api";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await resetPassword({ email });
      setSuccess(true);
      setCooldown(120); // inicia cooldown
    } catch (err: any) {
      setError("Erro ao enviar o link. Tente novamente.");
      console.error(err);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        {/* mensagem flutuante */}
        {success && (
          <div className={styles.successToast}>
            ✅ Email enviado com sucesso!
          </div>
        )}

        <h2>Esqueci minha senha</h2>
        <p>Insira seu email para receber o link de redefinição de senha.</p>

        {error && <p className={styles.errorText}>{error}</p>}

        <input
          type="email"
          placeholder="Digite seu email"
          className={styles.inputField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          className={styles.submitButton}
          disabled={cooldown > 0}
        >
          {cooldown > 0 ? "Aguarde..." : "Enviar link"}
        </button>

        {cooldown > 0 && (
          <p className={styles.cooldownText}>
            Você poderá reenviar o email em {cooldown}s
          </p>
        )}
      </form>
    </div>
  );
};

export default ForgotPasswordPage;