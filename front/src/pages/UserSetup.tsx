import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserSetup.module.css';
import { updateUser } from '../api';

function UserSetup() {
  const navigate = useNavigate();
  const [ramo, setRamo] = useState('');
  const [area, setArea] = useState('');
  const [interesses, setInteresses] = useState<string[]>(['Comércio']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInterestClick = (interesse: string) => {
    if (interesses.includes(interesse)) {
      setInteresses(interesses.filter(item => item !== interesse));
    } else {
      setInteresses([...interesses, interesse]);
    }
  };

  const handleSkip = () => {
    navigate('/');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const updateData = {
      field_of_work: ramo || undefined,
      interest_area: area || undefined,
      linkedin_url: undefined,
      is_auditor: false,
    };

    try {
      const response = await updateUser(updateData);
      console.log('Usuário atualizado com sucesso:', response);
      navigate('/'); 
    } catch (e: any) {
      setError('Erro ao atualizar informações. Por favor, tente novamente.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Informações Adicionais</h1>

        <div className={styles.stepIndicator}>Etapa 2 de 2</div>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Ramo empresarial (Opcional)</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Comércio"
              value={ramo}
              onChange={(e) => setRamo(e.target.value)}
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Áreas de Interesse (Opcional)</label>
            <div className={styles.interestContainer}>
              <button
                type="button"
                className={`${styles.interestButton} ${
                  interesses.includes('Agronegócio') ? styles.selected : ''
                }`}
                onClick={() => handleInterestClick('Agronegócio')}
                disabled={loading}
              >
                Agronegócio
              </button>
              <button
                type="button"
                className={`${styles.interestButton} ${
                  interesses.includes('Comércio') ? styles.selected : ''
                }`}
                onClick={() => handleInterestClick('Comércio')}
                disabled={loading}
              >
                Comércio
              </button>
              <button
                type="button"
                className={`${styles.interestButton} ${
                  interesses.includes('Indústria') ? styles.selected : ''
                }`}
                onClick={() => handleInterestClick('Indústria')}
                disabled={loading}
              >
                Indústria
              </button>
            </div>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Atualizando...' : 'Adicionar informações'}
            </button>
          </div>

          <div className={styles.skipContainer}>
            <button 
              type="button" 
              className={styles.skipButton}
              onClick={handleSkip}
              disabled={loading}
            >
              Pular por enquanto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserSetup;