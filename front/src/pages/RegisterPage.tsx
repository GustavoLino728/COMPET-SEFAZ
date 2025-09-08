import React from "react";
import { useNavigate } from "react-router-dom";
import styles from './RegisterPage.module.css';

function RegisterPage() {
  
    const navigate = useNavigate();

    const handleRegisterSubmit = (event: React.FormEvent) => {
        
        event.preventDefault(); 

        // AQUI colocar a lógica para salvar os dados do usuário
        // Por exemplo, pegar os valores dos inputs e enviar para uma API.

        console.log("Formulário de cadastro enviado! Navegando para /setup...");

        navigate('/setup');
    };

    return (
        <div className={styles.pageContainer}>
            <form className={styles.formContainer} onSubmit={handleRegisterSubmit}>
                <img src="" alt="Ícone de Cadeado" className={styles.formIcon}/>
                <h2>Cadastro</h2> 
                <p>Dados pessoais</p>

                <input type="text" placeholder="Nome Completo" className={styles.inputField} required />
                <input type="email" placeholder="Email" className={styles.inputField} required />
                <input type="url" placeholder="LinkedIn (Opcional)" className={styles.inputField} />
                <input type="text" placeholder="CPF" className={styles.inputField} required />
                <input type="password" placeholder="Senha" className={styles.inputField} required />
                <input type="password" placeholder="Confirme sua Senha" className={styles.inputField} required />
                
                <button type="submit" className={styles.submitButton}>Continuar...</button>
                
                <p className={styles.termsText}>Li e concordo com os <a href="/terms">Termos de Serviço</a> e <a href="/privacy">Política de Privacidade</a>.</p>

            </form>
        </div>
    );
};

export default RegisterPage;