import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./ResetPasswordConfirmPage.module.css";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const [uid, setUid] = useState("");
  const [token, setToken] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [senhaNaoCoincide, setSenhaNaoCoincide] = useState(false);

  useEffect(() => {
    const uidParam = searchParams.get("uid") || "";
    const tokenParam = searchParams.get("token") || "";
    setUid(uidParam);
    setToken(tokenParam);
  }, [searchParams]);

  useEffect(() => {
    // validação em tempo real se as senhas coincidem
    if (novaSenha && confirmaSenha && novaSenha !== confirmaSenha) {
      setSenhaNaoCoincide(true);
    } else {
      setSenhaNaoCoincide(false);
    }
  }, [novaSenha, confirmaSenha]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!novaSenha || !confirmaSenha) {
      setError("Preencha ambos os campos!");
      return;
    }

    if (senhaNaoCoincide) {
      setError("As senhas devem ser iguais!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/auth/users/reset_password_confirm/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, token, new_password: novaSenha }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data?.new_password ? data.new_password.join(" ") : "Erro ao redefinir senha.");
        return;
      }

      setMessage("Senha redefinida com sucesso!");
      setNovaSenha("");
      setConfirmaSenha("");
    } catch (err) {
      console.error(err);
      setError("Ocorreu um erro ao redefinir a senha.");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h2>Redefinir Senha</h2>
        <p>Digite sua nova senha abaixo.</p>

        {message && <p className={styles.messageText}>{message}</p>}
        {error && <p className={styles.errorText}>{error}</p>}

        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Nova senha"
            className={`${styles.inputField} ${senhaNaoCoincide ? styles.inputError : ""}`}
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Confirme a nova senha"
            className={`${styles.inputField} ${senhaNaoCoincide ? styles.inputError : ""}`}
            value={confirmaSenha}
            onChange={(e) => setConfirmaSenha(e.target.value)}
            required
          />
        </div>

        {senhaNaoCoincide && <p className={styles.errorText}>As senhas devem ser iguais</p>}

        <button type="submit" className={styles.submitButton} disabled={senhaNaoCoincide}>
          Redefinir Senha
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;