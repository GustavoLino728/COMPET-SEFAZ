import React from 'react';
import styled from 'styled-components';
import { FiPlus } from 'react-icons/fi';
import { BsCardText } from 'react-icons/bs';

const Sidebar = styled.aside`
  background-color: #7e6be9;
  color: #fff;
  border-radius: 8px;
  padding: 2rem;
  height: fit-content;
`;

const SidebarHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  h2 {
    margin: 0;
    font-size: 1.3rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: #e0d8ff;
  }

  select {
    width: 100%;
    padding: 0.75rem;
    border-radius: 6px;
    border: 1px solid #9a8ae1;
    background-color: #927ef0;
    color: #fff;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #fff;
    }
  }
`;

const GenerateButton = styled.button`
  background-color: #6c57d8;
  color: #fff;
  border: none;
  width: 100%;
  padding: 0.9rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #5b48c1;
  }
`;

const ChallengeGenerator: React.FC = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <h2>Gerador de Desafios</h2>
        <BsCardText size={22} />
      </SidebarHeader>
      <form>
        <FormGroup>
          <label htmlFor="difficulty">Nível de Dificuldade</label>
          <select id="difficulty" defaultValue="facil">
            <option value="facil">Fácil</option>
            <option value="medio">Médio</option>
            <option value="dificil">Difícil</option>
          </select>
        </FormGroup>
        <FormGroup>
          <label htmlFor="program">Tipo de Programa</label>
          <select id="program" defaultValue="proind">
            <option value="proind">Trilha Proind</option>
            <option value="prodepe">Trilha Prodepe</option>
            <option value="prodeauto">Trilha Prodeauto</option>
          </select>
        </FormGroup>
        <FormGroup>
          <label htmlFor="challenge-type">Desafio da Trilha</label>
          <select id="challenge-type" defaultValue="calculo">
            <option value="calculo">Cálculo de Incentivo</option>
            <option value="legislacao">Legislação</option>
          </select>
        </FormGroup>
        <GenerateButton type="submit">
          <FiPlus /> Gerar questões
        </GenerateButton>
      </form>
    </Sidebar>
  );
};

export default ChallengeGenerator;