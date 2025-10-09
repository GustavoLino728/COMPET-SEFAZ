import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import UserHeader from '../components/user/UserHeader'; // Reutilizamos o header
import ProfileBanner from '../components/profile/ProfileBanner';
import ProfileSidebar from '../components/profile/ProfileSidebar';

const PageWrapper = styled.div` background-color: #f8f9fa; min-height: 100vh; `;
const MainContainer = styled.main`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
`;
const ContentArea = styled.div`
  background: #fff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 2rem;
`;

const ProfilePage: React.FC = () => {
  return (
    <PageWrapper>
      <UserHeader />
      <MainContainer>
        <div>
          <ProfileBanner />
          <ProfileSidebar />
        </div>
        <ContentArea>
          {/* O Outlet renderiza o componente da rota filha aqui */}
          <Outlet />
        </ContentArea>
      </MainContainer>
    </PageWrapper>
  );
};
export default ProfilePage;