import React from 'react';
import styled from 'styled-components';

interface EssayAnswerProps {
  userAnswer: string;
  setUserAnswer: (answer: string) => void;
  isAnswered: boolean;
}

const EssayContainer = styled.div`
  width: 100%;
  max-width: 800px;
  text-align: left;
`;

const Label = styled.p`
  font-weight: 500;
  color: #495057;
  margin-bottom: 0.5rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  border-radius: 8px;
  border: 1px solid #dee2e6;
  padding: 1rem;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #6c63ff;
  }
`;

const UserAnswerDisplay = styled.div`
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    padding: 1rem;
    border-radius: 8px;
    line-height: 1.6;
    color: #495057;
`;


const EssayAnswer: React.FC<EssayAnswerProps> = ({ userAnswer, setUserAnswer, isAnswered }) => {
  if (isAnswered) {
    return (
        <EssayContainer>
            <Label>Sua resposta</Label>
            <UserAnswerDisplay>{userAnswer || "Nenhuma resposta fornecida."}</UserAnswerDisplay>
        </EssayContainer>
    );
  }

  return (
    <EssayContainer>
      <Label>Digite sua resposta abaixo</Label>
      <TextArea value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} />
    </EssayContainer>
  );
};

export default EssayAnswer;