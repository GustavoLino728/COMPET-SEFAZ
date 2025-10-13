import React from 'react';
import styled from 'styled-components';
import { type Challenge } from '../../types';
import { Link } from 'react-router-dom';
// Dados mocados para a lista de desafios

interface ChallengeListProps {
  challenges: Challenge[];
}

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: -1.5rem; /* Para se alinhar melhor com o box de cima */
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid #e0e2e8;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.5rem;
`;

const QuestionTag = styled.span`
  background: #e9efff;
  color: #5e60ce;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const Description = styled.p`
  margin: 0 0 1.5rem 0;
  color: #6c757d;
  line-height: 1.6;
`;

const StartButton = styled.button`
  background-color: #3b4a9f;
  color: #fff;
  border: none;
  padding: 0.8rem 1.8rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  
  &:hover {
    background-color: #2f3a7d;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none; /* Garante que o botão não tenha sublinhado */
`;

const ChallengeList: React.FC<ChallengeListProps> = ({ challenges }) => {
  
  // Uma boa prática: mostrar uma mensagem se a lista estiver vazia
  if (challenges.length === 0) {
    return <p style={{marginTop: '2rem', color: '#6c757d'}}>Nenhum desafio encontrado para este nível.</p>;
  }

  return (
    <ListContainer>
      {/* 4. Mapeie a prop "challenges" em vez da variável antiga */}
      {challenges.map(challenge => (
        <Card key={challenge.id}>
          <CardHeader>
            <Title>{challenge.title}</Title>
            <QuestionTag>{challenge.questions} perguntas</QuestionTag>
          </CardHeader>
          <Description>{challenge.description}</Description>
          <StyledLink to={`/desafio/${challenge.id}`}>
            <StartButton>Iniciar Desafio</StartButton>
          </StyledLink>

        </Card>
      ))}
    </ListContainer>
  );
}

export default ChallengeList;