import React from 'react';
import styled from 'styled-components';
import { FaUser } from 'react-icons/fa';

const BannerContainer = styled.div`
  background-color: #2f3a7d;
  color: #fff;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;
const Avatar = styled.div`
  width: 80px; height: 80px; border-radius: 50%;
  background-color: #fff; color: #6c63ff;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 1rem auto;
  font-size: 2.5rem;
`;
const UserType = styled.p` margin: 0; color: #e0d8ff; `;
const UserName = styled.h1` margin: 0.5rem 0 0 0; font-size: 2.5rem; `;

const ProfileBanner: React.FC = () => {
  return (
    <BannerContainer>
      <Avatar><FaUser /></Avatar>
      <UserType>Aluno</UserType>
      <UserName>Júlia Bacelar</UserName>
    </BannerContainer>
  );
};
export default ProfileBanner;