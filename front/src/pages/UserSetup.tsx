import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserSetup.module.css';

function UserSetup() {
  const navigate = useNavigate();
  const [ramo, setRamo] = useState('');
  const [area, setArea] = useState('');
  const [interesses, setInteresses] = useState<string[]>(['Comércio']); // 'Comércio' começa selecionado como no figma

  const handleInterestClick = (interesse: string) => {
    if (interesses.includes(interesse)) {
      setInteresses(interesses.filter(item => item !== interesse));
    } else {
      setInteresses([...interesses, interesse]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = { ramo, area, interesses };
    console.log("Dados do formulário:", formData);
    // navigate('/proxima-etapa');
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Informações Adicionais</h1>

        {/* Usando a nova classe para o indicador de etapas */}
        <div className={styles.stepIndicator}>
          Etapa 2 de 3
        </div>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Ramo empresarial (Opcional)</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Comércio"
              value={ramo}
              onChange={(e) => setRamo(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Área de atuação (Opcional)</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Automotivo e autopeças"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Áreas de Interesse (Opcional)</label>
            <div className={styles.interestContainer}>
              {/* Para os ícones, você precisaria importá-los como SVGs */}
              <button
                type="button"
                className={`${styles.interestButton} ${interesses.includes('Agronegócio') ? styles.selected : ''}`}
                onClick={() => handleInterestClick('Agronegócio')}
              >
                {/* Ícone aqui */} Agronegócio
              </button>
              <button
                type="button"
                className={`${styles.interestButton} ${interesses.includes('Comércio') ? styles.selected : ''}`}
                onClick={() => handleInterestClick('Comércio')}
              >
                {/* Ícone aqui */} Comércio
              </button>
              <button
                type="button"
                className={`${styles.interestButton} ${interesses.includes('Indústria') ? styles.selected : ''}`}
                onClick={() => handleInterestClick('Indústria')}
              >
                {/* Ícone aqui */} Indústria
              </button>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="submit" className={styles.submitButton}>
              Adicionar informações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserSetup;