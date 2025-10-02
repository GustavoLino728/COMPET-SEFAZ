import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';
import StatsCards from '../components/admin/StatsCards';
import ChallengesGrid from '../components/admin/ChallengesGrid';
import { IoIosArrowBack } from 'react-icons/io';
import { FiPlus } from 'react-icons/fi'; 

const AdminWrapper = styled.div`
  background-color: #f4f5fa;
  min-height: 100vh;
`;

const MainContent = styled.main`
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BackLink = styled(Link)`
  color: #555;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  width: fit-content;

  &:hover {
    color: #000;
  }
`;

const PageTitle = styled.h1`
  margin: 0;
  font-size: 2rem;
  color: #333;
`;

const TopSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
`;

const GenerateButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #2f3a7d;
  color: #fff;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  transition: background-color 0.2s;
  &:hover { background-color: #212529; }
`;


const AdminSefaz: React.FC = () => {
    // Dados mocados para o grid, ajuste conforme necessário
    const allChallenges = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        title: `Desafio Exemplo ${i + 1}`,
        tags: ['Trilha Exemplo', 'Tópico', 'Nível: Fácil']
    }));

  return (
    <AdminWrapper>
      <MainContent>
        <div>
          <PageHeader>
            <BackLink to="/"><IoIosArrowBack /> Voltar</BackLink>
            <PageTitle>Administrador Sefaz</PageTitle>
          </PageHeader>
        </div>
        <TopSection>
            <div style={{ flexGrow: 1 }}>
                <StatsCards activeStat="Desafios Gerados" />
            </div>
            <GenerateButton to="/admin/gerador">
                <FiPlus /> Gerar Desafios
            </GenerateButton>
        </TopSection>
        <ChallengesGrid title="Últimos Desafios Gerados" challenges={allChallenges} />
      </MainContent>
    </AdminWrapper>
  );
};

export default AdminSefaz;