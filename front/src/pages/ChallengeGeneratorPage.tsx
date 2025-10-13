// ChallengeGeneratorPage.tsx

import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';
import { IoIosArrowBack } from 'react-icons/io';
// Ícone de exemplo
import { FaDatabase } from 'react-icons/fa';
import { generateQuestions } from '../api';

const PageWrapper = styled.div`
  background-color: #f4f5fa;
  min-height: 100vh;
`;
const MainContent = styled.main`
  padding: 2rem 3rem;
`;
const BackLink = styled(Link)`...`; // Reutilize o estilo
const PageTitle = styled.h1`...`; // Reutilize o estilo

const GeneratorContainer = styled.div`
  background-color: #a398d5;
  border-radius: 12px;
  padding: 3rem;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;
const IconWrapper = styled.div`
  font-size: 4rem;
  color: #fff;
`;
const FormRow = styled.div`
  display: flex;
  gap: 1.5rem;
  width: 100%;
  align-items: flex-end;
`;
const FormGroup = styled.div`
  flex: 1;
  label { display: block; margin-bottom: 0.5rem; font-weight: 500; color: #fff; }
  select { width: 100%; padding: 0.8rem; border-radius: 6px; border: 1px solid #ccc; }
`;
const SubmitButton = styled.button`
  background-color: #2f3a7d;
  color: #fff;
  padding: 0.8rem 2.5rem;
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
  border: none;
  cursor: pointer;
  height: fit-content;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ChallengeGeneratorPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    difficulty: 'Fácil',
    program: 'PROIND',
    track: 'Cálculo de Incentivo',
    topic: '',
    type: 'Cálculo'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.topic.trim()) {
      alert('Por favor, preencha o assunto do desafio');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await generateQuestions({
        program: formData.program,
        track: formData.track,
        topic: formData.topic,
        difficulty: formData.difficulty,
        type: formData.type
      });
      
      // Response now returns the persisted Challenge with IDs
      navigate('/admin/desafio-gerado', { 
        state: { challenge: response }
      });
    } catch (error) {
      console.error('Erro ao gerar questões:', error);
      alert('Erro ao gerar questões. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <MainContent>
        <BackLink to="/admin"><IoIosArrowBack /> Voltar</BackLink>
        <PageTitle>Gerador de desafios</PageTitle>
        <GeneratorContainer>
          <IconWrapper><FaDatabase /></IconWrapper>
          <form onSubmit={handleSubmit}>
            <FormRow>
              <FormGroup>
                <label>Nível de Dificuldade</label>
                <select 
                  value={formData.difficulty}
                  onChange={(e) => handleInputChange('difficulty', e.target.value)}
                >
                  <option value="Fácil">Fácil</option>
                  <option value="Médio">Médio</option>
                  <option value="Difícil">Difícil</option>
                </select>
              </FormGroup>
              <FormGroup>
                <label>Programa</label>
                <select 
                  value={formData.program}
                  onChange={(e) => handleInputChange('program', e.target.value)}
                >
                  <option value="PROIND">PROIND</option>
                  <option value="PRODEPE">PRODEPE</option>
                  <option value="PRODEAUTO">PRODEAUTO</option>
                </select>
              </FormGroup>
              <FormGroup>
                <label>Trilha</label>
                <select 
                  value={formData.track}
                  onChange={(e) => handleInputChange('track', e.target.value)}
                >
                  <option value="Cálculo de Incentivo">Cálculo de Incentivo</option>
                  <option value="Lançamentos do Incentivo">Lançamentos do Incentivo</option>
                  <option value="Controles Suplementares">Controles Suplementares</option>
                </select>
              </FormGroup>
              <FormGroup>
                <label>Assunto do Desafio</label>
                <input
                  type="text"
                  placeholder="Assunto"
                  value={formData.topic}
                  onChange={(e) => handleInputChange('topic', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    borderRadius: '6px',
                    border: '1px solid #ccc'
                  }}
                />
              </FormGroup>
              <FormGroup>
                <label>Tipo do Desafio</label>
                <select 
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                >
                  <option value="Discursiva" disabled style={{ color: '#999', fontStyle: 'italic' }}>
                    Discursiva (Em breve)
                  </option>
                  <option value="Cálculo">Cálculo</option>
                </select>
              </FormGroup>
              <SubmitButton type="submit" disabled={isLoading}>
                {isLoading ? 'Gerando...' : 'Gerar questões'}
              </SubmitButton>
            </FormRow>
          </form>
        </GeneratorContainer>
      </MainContent>
    </PageWrapper>
  );
};

export default ChallengeGeneratorPage;