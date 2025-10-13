import React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

interface InstructionsProps {
  description: string;
  questionCount: number;
}

const InstructionsContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background-color: #fff;
`;

const Description = styled.p`
  max-width: 600px;
  font-size: 1.2rem;
  line-height: 1.7;
  color: #495057;

  strong {
    color: #212529;
  }
`;

const CallToAction = styled.p`
  font-size: 1.1rem;
  color: #6c757d;
  margin: 1rem 0 2rem 0;
`;

const StartButton = styled.button`
  background-color: #495057;
  color: #fff;
  border: none;
  padding: 0.9rem 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);

  &:hover {
    background-color: #343a40;
  }
`;

const StartInstructions: React.FC<InstructionsProps> = ({ description, questionCount }) => {
  // Capturar o ID da URL da página atual
  const { id } = useParams<{ id: string }>();

  return (
    <InstructionsContainer>
      <Description>
        {description}
        <br />
        <strong>
          {questionCount === 1 
            ? 'É 1 questão ao todo.'
            : `São ${questionCount} questões ao todo.`
          }
        </strong>
      </Description>
      <CallToAction>Clique no botão abaixo para começar</CallToAction>
      
      {/* Link para o quiz usando o ID capturado da URL */}
      <Link to={`/quiz/${id}`}>
        <StartButton>Iniciar quiz</StartButton>
      </Link>
    </InstructionsContainer>
  );
};

export default StartInstructions;