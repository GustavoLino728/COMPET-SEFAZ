import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const HeaderContainer = styled.header`
  background-color: #fff;
  padding: 1rem 3rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #212529;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #495057;
  font-weight: 500;
  cursor: pointer;
  &:hover { color: #5e60ce; }
`;

const ProfileButton = styled.button`
  background-color: #5e60ce;
  color: #fff;
  border: none;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #4c4eb8;
  }
`;

const UserHeader: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo>fiscolab</Logo>
      <Nav>
        <NavLink>Início</NavLink>
        <NavLink>Trilhas</NavLink>
        <NavLink>Teste de perfil</NavLink>
        <NavLink>Certificações</NavLink>
        <Link to="/perfil">
            <ProfileButton>Acessar perfil</ProfileButton>
        </Link>
      </Nav>
    </HeaderContainer>
  );
};

export default UserHeader;