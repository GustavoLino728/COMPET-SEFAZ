import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';

const PageWrapper = styled.div`
  background-color: #f8f9fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CompletionCard = styled.div`
  background-color: #2f3a7d;
  color: #fff;
  border-radius: 20px;
  padding: 3rem 4rem;
  text-align: center;
  position: relative;
  width: 100%;
  max-width: 700px;
`;

const IconCircle = styled.div`
  position: absolute; top: -30px; left: 50%;
  transform: translateX(-50%); width: 60px; height: 60px;
  border-radius: 50%; background-color: #6c63ff;
  display: flex; align-items: center; justify-content: center;
  border: 4px solid #f8f9fa;
`;

const Title = styled.h1` margin: 1.5rem 0 0.5rem 0; font-size: 2.5rem; `;
const Subtitle = styled.p` margin: 0; font-size: 1.2rem; color: #e0d8ff; `;

const NextButton = styled.button`
  background-color: #495057; color: #fff; border: none;
  padding: 0.9rem 2.5rem; font-size: 1rem; font-weight: 600;
  border-radius: 6px; cursor: pointer; margin-top: 3rem;
  transition: background-color 0.2s;
  &:hover { background-color: #343a40; }
`;

const QuizCompletionPage: React.FC = () => {
  return (
    <PageWrapper>
      <CompletionCard>
        <IconCircle><FaCheck size={24} /></IconCircle>
        <Title>Parabéns, você concluiu o Desafio 1 com sucesso!</Title>
        <Subtitle>PROIND T1: Cálculo do Incentivo</Subtitle>
      </CompletionCard>
      <Link to="/quiz/avaliacao/1">
          <NextButton>Voltar para trilha</NextButton>
      </Link>
    </PageWrapper>
  );
};

export default QuizCompletionPage;