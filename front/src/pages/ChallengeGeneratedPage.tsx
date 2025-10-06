import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';
import { IoIosArrowBack } from 'react-icons/io';

const PageWrapper = styled.div`
  background-color: #f4f5fa;
  min-height: 100vh;
`;
const MainContent = styled.main`
  padding: 2rem 3rem;
`;
const BackLink = styled(Link)`...`; // Reutilize o estilo
const PageTitle = styled.h1`...`; // Reutilize o estilo

const HeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TagsContainer = styled.div`...`; // Reutilize o estilo de ChallengesGrid
const Tag = styled.span`...`; // Reutilize o estilo de ChallengesGrid
const ActionButtons = styled.div` display: flex; gap: 1rem; `;
const Button = styled.button<{ primary?: boolean }>`
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  background-color: ${props => props.primary ? '#fff' : '#ffebee'};
  color: ${props => props.primary ? '#6c757d' : '#c62828'};
  border: 1px solid ${props => props.primary ? '#ced4da' : '#ef9a9a'};
`;
const EditorContainer = styled.div`
  background: #fff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 2rem;
  margin-top: 1.5rem;
`;
const TextArea = styled.textarea`
  width: 100%;
  min-height: 300px;
  border: 1px solid #ced4da;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1rem;
`;
const FooterButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;
const CancelButton = styled.button`...`; // Estilize como desejar
const ApproveButton = styled.button`...`; // Estilize como desejar

const ChallengeGeneratedPage: React.FC = () => {
    return (
        <PageWrapper>
            <AdminHeader />
            <MainContent>
                <BackLink to="/admin/gerador"><IoIosArrowBack /> Voltar</BackLink>
                <HeaderActions>
                    <div>
                        <PageTitle>Desafio Gerado</PageTitle>
                        <TagsContainer>
                            <Tag>Trilha Proind</Tag>
                            <Tag>Cálculo do Incentivo</Tag>
                            <Tag>Nível: Fácil</Tag>
                        </TagsContainer>
                    </div>
                    <ActionButtons>
                        <Button primary>Salvar Rascunho</Button>
                        <Button>Excluir Desafio</Button>
                    </ActionButtons>
                </HeaderActions>
                <EditorContainer>
                    <h3>Edite sua Pergunta:</h3>
                    <TextArea defaultValue="Missão Nível 1 - Estudo de Caso Simples do PROIND..." />
                </EditorContainer>
                <FooterButtons>
                    <CancelButton>Cancelar</CancelButton>
                    <ApproveButton>Aprovar desafio</ApproveButton>
                </FooterButtons>
            </MainContent>
        </PageWrapper>
    );
}

export default ChallengeGeneratedPage;