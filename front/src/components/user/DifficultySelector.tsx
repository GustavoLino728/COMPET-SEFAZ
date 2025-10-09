import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  isActive: boolean;
}

interface SelectorProps {
  selected: string;
  onSelect: (difficulty: string) => void;
}

const SelectorContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const DifficultyButton = styled.button<ButtonProps>`
  flex: 1;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  background-color: ${props => props.isActive ? '#3b4a9f' : '#fff'};
  color: ${props => props.isActive ? '#fff' : '#3b4a9f'};
  border: 1px solid ${props => props.isActive ? '#3b4a9f' : '#e0e2e8'};
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }
`;

const difficulties = ['Básico', 'Intermediário', 'Avançado'];

const DifficultySelector: React.FC<SelectorProps> = ({ selected, onSelect }) => {
  return (
    <SelectorContainer>
      {difficulties.map(level => (
        <DifficultyButton 
          key={level}
          isActive={selected === level}
          onClick={() => onSelect(level)}
        >
          {level}
        </DifficultyButton>
      ))}
    </SelectorContainer>
  );
}

export default DifficultySelector;