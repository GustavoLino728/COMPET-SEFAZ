import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Section = styled.section`
  margin-bottom: 3.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 1.2rem;
    margin: 0 0 0.5rem 0;
  }

  p {
    color: #6c757d;
    font-size: 0.95rem;
    line-height: 1.5;
    flex-grow: 1;
  }
`;

const PrimaryButton = styled.button`
  background-color: #5e60ce;
  color: #fff;
  border: none;
  padding: 0.7rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  align-self: flex-start;

  &:hover {
    background-color: #4c4eb8;
  }
`;

const WhiteButton = styled(PrimaryButton)`
  background-color: #fff;
  color: #5e60ce;
  &:hover {
    background-color: #f0f0f8;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;


const QuickAccess: React.FC = () => {
  return (
    <Section>
      <SectionTitle>Acesso Rápido</SectionTitle>
      <Grid>
        <Card>
          <h3>Explore as Trilhas de Aprendizado</h3>
          <p>Descubra trilhas de aprendizado estruturadas, personalizadas para o seu papel e interesses.</p>
          <PrimaryButton>Visualizar Trilhas</PrimaryButton>
        </Card>
        <Card>
          <h3>Consiga Certificados</h3>
          <p>Valide sua expertise com certificações reconhecidas pelo setor.</p>
          <PrimaryButton>Ver meus Certificados</PrimaryButton>
        </Card>
        <Card>
          <h3>Teste de perfil</h3>
          <p>Nos ajude a identificar melhor o seu perfil para que possamos oferecer um conteúdo direcionado as suas necessidades.</p>
          <PrimaryButton>Realizar teste</PrimaryButton>
        </Card>
        {/* O card de Admin agora é um card normal */}
        <Card>
          <h3>Administrador SEFAZ</h3>
          <p>Acesse aqui para aprovar os desafios.</p>
          <Link to="/admin">
            <PrimaryButton>Acessar Admin</PrimaryButton>
          </Link>
        </Card>
      </Grid>
    </Section>
  );
};

export default QuickAccess;