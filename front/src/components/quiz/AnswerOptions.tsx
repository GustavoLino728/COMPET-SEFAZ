import React from 'react';
import styled from 'styled-components';

interface AnswerOptionsProps {
  options: string[];
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
  isAnswered: boolean;
  correctAnswerIndex: number;
}

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  width: 100%;
  max-width: 800px;
`;

const OptionButton = styled.button<{ 
    isSelected: boolean; 
    isCorrect: boolean;
    isIncorrect: boolean;
    isAnswered: boolean;
}>`
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: all 0.2s ease-in-out;

  /* Lógica de cores para o feedback */
  border: 2px solid ${props => {
    if (props.isAnswered && props.isCorrect) return '#28a745'; /* Verde para correto */
    if (props.isAnswered && props.isIncorrect) return '#dc3545'; /* Vermelho para incorreto */
    if (props.isSelected) return '#6c63ff'; /* Roxo para selecionado (antes de confirmar) */
    return '#e9ecef'; /* Padrão */
  }};
  
  transform: ${props => props.isSelected ? 'translateY(-2px)' : 'none'};

  &:hover {
    border-color: ${props => !props.isAnswered ? '#6c63ff' : ''};
  }

  /* Desabilita o clique depois de responder */
  pointer-events: ${props => props.isAnswered ? 'none' : 'auto'};

  span {
    /* Colore o texto da resposta correta */
    color: ${props => props.isAnswered && props.isCorrect ? '#28a745' : 'inherit'};
  }
`;

const OptionLabel = styled.span`...`; 
const optionLabels = ['A', 'B', 'C', 'D', 'E'];

const AnswerOptions: React.FC<AnswerOptionsProps> = ({ options, selectedAnswer, onSelectAnswer, isAnswered, correctAnswerIndex }) => {
  return (
    <OptionsContainer>
      {options.map((option, index) => {
        const isCorrect = index === correctAnswerIndex;
        const isSelected = selectedAnswer === index;
        const isIncorrect = isSelected && !isCorrect;

        return (
          <OptionButton
            key={index}
            isSelected={isSelected}
            isCorrect={isCorrect}
            isIncorrect={isIncorrect}
            isAnswered={isAnswered}
            onClick={() => onSelectAnswer(index)}
          >
            <OptionLabel>{optionLabels[index]}</OptionLabel>
            <span>{option}</span>
          </OptionButton>
        );
      })}
    </OptionsContainer>
  );
};

export default AnswerOptions;