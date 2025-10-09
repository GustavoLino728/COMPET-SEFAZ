import React from 'react';
import styled from 'styled-components';
import { FaPencilAlt, FaCheck } from 'react-icons/fa';

// Reutilize os componentes de estilo do PersonalInfoTab para consistência
// (TabWrapper, Header, EditButton, FormSection, FormGroup, Input)

const TabWrapper = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  h2 { font-size: 1.5rem; margin: 0; }
`;

const EditButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
  h3 { font-size: 1.2rem; margin-bottom: 1rem; }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
  label { display: block; margin-bottom: 0.5rem; color: #495057; }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border-radius: 6px;
  border: 1px solid #ced4da;
  font-size: 1rem;

  &:disabled {
    background: #e9ecef;
    cursor: not-allowed;
  }
`;

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #2f3a7d;
  color: #fff;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
`;

const ProfessionalInfoTab: React.FC = () => {
  return (
    <TabWrapper>
      <Header>
        <h2>Informações profissionais</h2>
        <EditButton><FaPencilAlt /> Editar</EditButton>
      </Header>
      <FormSection>
        <FormGroup>
          <label htmlFor="businessSector">Ramo empresarial</label>
          <Input id="businessSector" type="text" value="Comércio" />
        </FormGroup>
        <FormGroup>
          <label htmlFor="area">Área de atuação</label>
          <Input id="area" type="text" value="Automotivo e autopeças" />
        </FormGroup>
        <FormGroup>
          <label htmlFor="interests">Áreas de interesse</label>
          <Input id="interests" type="text" />
        </FormGroup>
        <SaveButton><FaCheck /> Concluído</SaveButton>
      </FormSection>
    </TabWrapper>
  );
};
export default ProfessionalInfoTab;