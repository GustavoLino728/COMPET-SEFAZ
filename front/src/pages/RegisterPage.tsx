import React from "react";
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
    return (
        <div className={styles.pageContainer}>
            <form className={styles.formContainer}>
                <img src="" alt="Ícone de Cadeado" className="formIcon"/>
                <h2>Cadrastro</h2>

                <input type="text" placeholder="Nome Completo" className={styles.InputField} required />
                <input type="email" placeholder="Email" className={styles.InputField} required />
                <input type="password" placeholder="Senha" className={styles.InputField} required />
                <input type="text" placeholder="Área Profissional" className={styles.InputField} required />
                <input type="text" placeholder="Empresa (Opcional)" className={styles.InputField} required />
                <input type="text" placeholder="Área de Interesse" className={styles.InputField} required />
                <button type="submit" className={styles.submitButton}>Finalizar Cadrastro</button>
                
                <p className="formFooter">Já tem uma conta? <a href="/login">Faça login</a></p>
                <p className="formFooter">Ao se cadastrar, você concorda com nossos <a href="/terms">Termos de Serviço</a> e <a href="/privacy">Política de Privacidade</a>.</p>

            </form>
        </div>
    );
};
export default RegisterPage;
