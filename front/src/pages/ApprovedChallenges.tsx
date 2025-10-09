import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';
import StatsCards from '../components/admin/StatsCards';
import ChallengesGrid from '../components/admin/ChallengesGrid';
import { IoIosArrowBack } from 'react-icons/io';
import { fetchApprovedChallenges, fetchPendingChallenges, deleteChallenge } from '../api';


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
  const [challenges, setChallenges] = useState<any[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChallenges = async () => {
      try {
        // Carregar desafios aprovados
        const approvedData = await fetchApprovedChallenges();
        const formattedChallenges = approvedData.map((challenge: any) => ({
          id: challenge.id,
          title: `Desafio ${challenge.id} - ${challenge.title}`,
          tags: [
            challenge.program_name || 'Programa',
            challenge.track_name || 'Trilha',
            `Nível: ${challenge.difficulty === 'EASY' ? 'Fácil' : challenge.difficulty === 'MEDIUM' ? 'Médio' : 'Difícil'}`
          ]
        }));
        setChallenges(formattedChallenges);

        // Carregar contagem de desafios pendentes
        const pendingData = await fetchPendingChallenges();
        setPendingCount(pendingData.length);
      } catch (error) {
        console.error('Erro ao carregar desafios aprovados:', error);
      } finally {
        setLoading(false);
      }
    };

    loadChallenges();
  }, []);

  const handleDeleteChallenge = async (challengeId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este desafio? Esta ação não pode ser desfeita.')) {
      try {
        await deleteChallenge(challengeId);
        // Recarregar ambas as listas
        const approvedData = await fetchApprovedChallenges();
        const pendingData = await fetchPendingChallenges();
        
        const formattedChallenges = approvedData.map((challenge: any) => ({
          id: challenge.id,
          title: `Desafio ${challenge.id} - ${challenge.title}`,
          tags: [
            challenge.program_name || 'Programa',
            challenge.track_name || 'Trilha',
            `Nível: ${challenge.difficulty === 'EASY' ? 'Fácil' : challenge.difficulty === 'MEDIUM' ? 'Médio' : 'Difícil'}`
          ]
        }));
        setChallenges(formattedChallenges);
        setPendingCount(pendingData.length);
        alert('Desafio excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir desafio:', error);
        alert('Erro ao excluir desafio. Tente novamente.');
      }
    }
  };

  return (
    <PageWrapper>
      <MainContent>
        <PageHeader>
          <BackLink to="/admin"><IoIosArrowBack /> Voltar</BackLink>
          <PageTitle>Administrador Sefaz</PageTitle>
        </PageHeader>
        <div style={{ margin: '2rem 0' }}>
            {/* Aqui passamos a prop para destacar o card correto */}
            <StatsCards 
                activeStat="Desafios Aprovados" 
                pendingCount={pendingCount}
                approvedCount={challenges.length}
            />
        </div>
        
        {/* E aqui passamos o título e a lista de desafios aprovados */}
        {loading ? (
          <div>Carregando desafios aprovados...</div>
        ) : (
          <ChallengesGrid 
            title="Desafios Aprovados" 
            challenges={challenges} 
            showApproveButton={false}
            onDelete={handleDeleteChallenge}
          />
        )}

      </MainContent>
    </PageWrapper>
  );
};

export default ApprovedChallenges;