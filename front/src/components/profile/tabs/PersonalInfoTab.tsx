import React from 'react';
import styled from 'styled-components';
import { FaPencilAlt, FaEye } from 'react-icons/fa';

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

const PasswordInputContainer = styled.div`
  position: relative;
  svg {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #6c757d;
    cursor: pointer;
  }
`;

const PasswordFields = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const PersonalInfoTab: React.FC = () => {
  return (
    <TabWrapper>
      <Header>
        <h2>Informações pessoais</h2>
        <EditButton><FaPencilAlt /> Editar</EditButton>
      </Header>
      
      <FormSection>
        <FormGroup>
          <label htmlFor="fullName">Nome completo (Obrigatório)</label>
          <Input id="fullName" type="text" value="Júlia Bacelar" />
        </FormGroup>
        <FormGroup>
          <label htmlFor="cpf">CPF</label>
          <Input id="cpf" type="text" value="123.456.789-10" disabled />
        </FormGroup>
        <FormGroup>
          <label htmlFor="linkedin">LinkedIn</label>
          <Input id="linkedin" type="text" placeholder="Link do perfil" />
        </FormGroup>
      </FormSection>

      <FormSection>
        <h3>Dados cadastrais</h3>
        <FormGroup>
          <label htmlFor="email">E-mail</label>
          <Input id="email" type="email" value="juliabacelar@gmail.com" />
        </FormGroup>
        <FormGroup>
          <label>Alterar senha</label>
          <PasswordFields>
            <PasswordInputContainer>
              <Input type="password" placeholder="Senha atual" />
              <FaEye />
            </PasswordInputContainer>
            <PasswordInputContainer>
              <Input type="password" placeholder="Nova senha" />
              <FaEye />
            </PasswordInputContainer>
          </PasswordFields>
        </FormGroup>
      </FormSection>
    </TabWrapper>
  );
};
export default PersonalInfoTab;