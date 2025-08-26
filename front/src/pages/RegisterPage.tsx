import React from "react";
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
    return (
        <div className={styles.pageContainer}>
            <form className={styles.formContainer}>
                <img src="" alt="Ícone de Cadeado" className={styles.formIcon}/>
                <h2>Cadrastro</h2>
                <p>Dados pessoais</p>

                <input type="text" placeholder="Nome Completo" className={styles.inputField} required />
                <input type="email" placeholder="Email" className={styles.inputField} required />
                <input type="Link" placeholder="LinkedIn (Opcional)" className={styles.inputField} required />
                <input type="text" placeholder="CPF" className={styles.inputField} required />
                <input type="password" placeholder="Senha" className={styles.inputField} required />
                <input type="password" placeholder="Confirme sua Senha" className={styles.inputField} required />
                <input type="text" placeholder="Área Profissional" className={styles.inputField} required />
                <input type="text" placeholder="Empresa (Opcional)" className={styles.inputField} required />
                <input type="text" placeholder="Área de Interesse" className={styles.inputField} required />
                <button type="submit" className={styles.submitButton}>Finalizar Cadrastro</button>
                
                <p className={styles.termsText}>Li e concordo com os <a href="/terms">Termos de Serviço</a> e <a href="/privacy">Política de Privacidade</a>.</p>

            </form>
        </div>
    );
};
export default RegisterPage;
