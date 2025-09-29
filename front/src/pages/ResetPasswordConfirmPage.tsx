import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ResetPasswordConfirmPage.module.css";
import { confirmResetPassword } from "../api";

const ResetPasswordConfirmPage = () => {
  const { uid, token } = useParams<{ uid: string; token: string }>();
  const navigate = useNavigate();
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<string>("");

  useEffect(() => {
    if (!uid || !token) {
      setError("Link inválido ou expirado. Solicite um novo link de redefinição.");
    }
  }, [uid, token]);

  useEffect(() => {
    if (newPassword && confirmPassword) {
      setPasswordMismatch(newPassword !== confirmPassword);
    } else {
      setPasswordMismatch(false);
    }
  }, [newPassword, confirmPassword]);

  useEffect(() => {
    if (newPassword.length === 0) {
      setPasswordStrength("");
      return;
    }

    let strength = "";
    let score = 0;

    if (newPassword.length >= 8) score++;
    if (/[a-z]/.test(newPassword)) score++;
    if (/[A-Z]/.test(newPassword)) score++;
    if (/[0-9]/.test(newPassword)) score++;
    if (/[^A-Za-z0-9]/.test(newPassword)) score++;

    switch (score) {
      case 0-1: strength = "Muito fraca"; break;
      case 2: strength = "Fraca"; break;
      case 3: strength = "Média"; break;
      case 4: strength = "Forte"; break;
      case 5: strength = "Muito forte"; break;
      default: strength = "";
    }

    setPasswordStrength(strength);
  }, [newPassword]);

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push("A senha deve ter pelo menos 8 caracteres.");
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push("A senha deve conter pelo menos uma letra minúscula.");
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push("A senha deve conter pelo menos uma letra maiúscula.");
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push("A senha deve conter pelo menos um número.");
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!uid || !token) {
      setError("Link inválido ou expirado.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    if (passwordMismatch) {
      setError("As senhas devem ser iguais.");
      return;
    }

    const passwordErrors = validatePassword(newPassword);
    if (passwordErrors.length > 0) {
      setError(passwordErrors.join(" "));
      return;
    }

    setLoading(true);

    try {
      await confirmResetPassword({
        uid: uid!,
        token: token!,
        new_password: newPassword,
        re_new_password: confirmPassword
      });

      setMessage("Senha redefinida com sucesso! Redirecionando para o login...");
      
      setTimeout(() => {
        navigate("/login");
      }, 3000);

    } catch (err: any) {
      let errorMessage = "Erro ao redefinir senha. Tente novamente.";
    
      if (err.response?.data) {
        if (err.response.data.token) {
          errorMessage = Array.isArray(err.response.data.token)
            ? err.response.data.token[0]
            : err.response.data.token;
          if (errorMessage.toLowerCase().includes('invalid')) {
            errorMessage = "Link inválido ou expirado. Solicite um novo link de redefinição.";
          }
        } else if (err.response.data.new_password) {
          errorMessage = Array.isArray(err.response.data.new_password)
            ? err.response.data.new_password.join(" ")
            : err.response.data.new_password;
        } else if (err.response.data.uid) {
          errorMessage = "Link inválido ou expirado. Solicite um novo link de redefinição.";
        } else if (err.response.data.detail) {
          errorMessage = err.response.data.detail;
        } else if (err.response.data.non_field_errors) {
          errorMessage = Array.isArray(err.response.data.non_field_errors)
            ? err.response.data.non_field_errors[0]
            : err.response.data.non_field_errors;
        }
      }
      
      setError(errorMessage);
      console.error('Erro na confirmação de reset de senha:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      if (error && !message) setError("");
    };

  if (!uid || !token) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.formContainer}>
          <h2>Link Inválido</h2>
          <p className={styles.errorText}>
            Este link de redefinição é inválido ou expirado.
          </p>
          <p>
            <a href="/esqueci-senha" className={styles.linkButton}>
              Solicitar novo link
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h2>Redefinir Senha</h2>
        <p>Digite sua nova senha abaixo.</p>

        {message && (
          <div className={styles.successMessage}>
            ✅ {message}
          </div>
        )}

        {error && <p className={styles.errorText}>{error}</p>}

        <div className={styles.inputGroup}>
          <label htmlFor="newPassword">Nova senha</label>
          <input
            type="password"
            id="newPassword"
            placeholder="Digite sua nova senha"
            className={`${styles.inputField} ${passwordMismatch ? styles.inputError : ""}`}
            value={newPassword}
            onChange={handlePasswordChange(setNewPassword)}
            disabled={loading}
            required
          />
          {passwordStrength && (
            <div className={`${styles.passwordStrength} ${styles[passwordStrength.toLowerCase().replace(' ', '')]}`}>
              Força: {passwordStrength}
            </div>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword">Confirmar nova senha</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirme sua nova senha"
            className={`${styles.inputField} ${passwordMismatch ? styles.inputError : ""}`}
            value={confirmPassword}
            onChange={handlePasswordChange(setConfirmPassword)}
            disabled={loading}
            required
          />
        </div>

        {passwordMismatch && confirmPassword && (
          <p className={styles.errorText}>As senhas devem ser iguais</p>
        )}

        <div className={styles.passwordRequirements}>
          <h4>Sua senha deve conter:</h4>
          <ul>
            <li className={newPassword.length >= 8 ? styles.valid : styles.invalid}>
              Pelo menos 8 caracteres
            </li>
            <li className={/(?=.*[a-z])/.test(newPassword) ? styles.valid : styles.invalid}>
              Pelo menos uma letra minúscula
            </li>
            <li className={/(?=.*[A-Z])/.test(newPassword) ? styles.valid : styles.invalid}>
              Pelo menos uma letra maiúscula
            </li>
            <li className={/(?=.*\d)/.test(newPassword) ? styles.valid : styles.invalid}>
              Pelo menos um número
            </li>
          </ul>
        </div>

        <button 
          type="submit" 
          className={styles.submitButton} 
          disabled={passwordMismatch || loading || !newPassword || !confirmPassword}
        >
          {loading ? "Redefinindo..." : "Redefinir Senha"}
        </button>

        <div className={styles.linkContainer}>
          <a href="/login" className={styles.backLink}>
            ← Voltar para o login
          </a>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordConfirmPage;