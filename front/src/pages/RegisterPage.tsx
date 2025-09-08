import React from "react";
import { useNavigate } from "react-router-dom";
import styles from './RegisterPage.module.css';

// 1. Unificamos tudo em uma única função RegisterPage
function RegisterPage() {
    // 2. A lógica fica aqui, no topo do componente
    const navigate = useNavigate();

    // 3. Esta é a função que será executada quando o formulário for enviado
    const handleRegisterSubmit = (event: React.FormEvent) => {
        // Previne que a página recarregue, que é o comportamento padrão de um form
        event.preventDefault(); 

        // AQUI você colocaria a lógica para salvar os dados do usuário
        // Por exemplo, pegar os valores dos inputs e enviar para uma API.
        // Por enquanto, vamos apenas simular que deu tudo certo.

        console.log("Formulário de cadastro enviado! Navegando para /setup...");

        // 4. Após tudo dar certo, usamos o navigate para ir para a próxima página
        navigate('/setup');
    };

    // 5. O return contém todo o seu HTML.
    return (
        <div className={styles.pageContainer}>
            {/* 6. A MÁGICA ACONTECE AQUI: conectamos a função ao form com 'onSubmit' */}
            <form className={styles.formContainer} onSubmit={handleRegisterSubmit}>
                <img src="" alt="Ícone de Cadeado" className={styles.formIcon}/>
                <h2>Cadastro</h2> {/* Corrigido de "Cadrastro" para "Cadastro" :) */}
                <p>Dados pessoais</p>

                <input type="text" placeholder="Nome Completo" className={styles.inputField} required />
                <input type="email" placeholder="Email" className={styles.inputField} required />
                {/* Dica: o tipo correto para um link é 'url', não 'Link' */}
                <input type="url" placeholder="LinkedIn (Opcional)" className={styles.inputField} />
                <input type="text" placeholder="CPF" className={styles.inputField} required />
                <input type="password" placeholder="Senha" className={styles.inputField} required />
                <input type="password" placeholder="Confirme sua Senha" className={styles.inputField} required />

                {/* Este botão, por ser 'type="submit"', vai acionar o 'onSubmit' do formulário */}
                <button type="submit" className={styles.submitButton}>Continuar...</button>
                
                <p className={styles.termsText}>Li e concordo com os <a href="/terms">Termos de Serviço</a> e <a href="/privacy">Política de Privacidade</a>.</p>

            </form>
        </div>
    );
};

export default RegisterPage;