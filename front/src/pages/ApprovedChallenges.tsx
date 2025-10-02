import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';
import StatsCards from '../components/admin/StatsCards';
import ChallengesGrid from '../components/admin/ChallengesGrid';
import { IoIosArrowBack } from 'react-icons/io';

// Dados mocados apenas para esta página
const approvedChallenges = [
  { id: 1, title: 'Desafio Proind 01', tags: ['Trilha Proind', 'Cálculo do Incentivo', 'Nível: Fácil'] },
  { id: 4, title: 'Desafio Proind 02', tags: ['Trilha Proind', 'Cálculo do Incentivo', 'Nível: Difícil'] },
  { id: 5, title: 'Desafio Prodeauto 01', tags: ['Trilha Prodeauto', 'Cálculo do Incentivo', 'Nível: Fácil'] },
  { id: 7, title: 'Desafio Proind 03', tags: ['Trilha Proind', 'Cálculo do Incentivo', 'Nível: Fácil'] },
  { id: 9, title: 'Desafio Prodepe 03', tags: ['Trilha Prodepe', 'Cálculo do Incentivo', 'Nível: Médio'] },
];


const PageWrapper = styled.div`
  background-color: #f4f5fa;
  min-height: 100vh;
`;

const MainContent = styled.main`
  padding: 2rem 3rem;
`;

const PageHeader = styled.div`...`; // re-use estilos de AdminSefaz
const BackLink = styled(Link)`...`; // re-use estilos de AdminSefaz
const PageTitle = styled.h1`...`; // re-use estilos de AdminSefaz

const ApprovedChallenges: React.FC = () => {
  return (
    <PageWrapper>
      <AdminHeader />
      <MainContent>
        <PageHeader>
          <BackLink to="/admin"><IoIosArrowBack /> Voltar</BackLink>
          <PageTitle>Administrador Sefaz</PageTitle>
        </PageHeader>
        <div style={{ margin: '2rem 0' }}>
            {/* Aqui passamos a prop para destacar o card correto */}
            <StatsCards activeStat="Desafios Aprovados" />
        </div>
        
        {/* E aqui passamos o título e a lista de desafios aprovados */}
        <ChallengesGrid title="Desafios Aprovados" challenges={approvedChallenges} />

      </MainContent>
    </PageWrapper>
  );
};

export default ApprovedChallenges;