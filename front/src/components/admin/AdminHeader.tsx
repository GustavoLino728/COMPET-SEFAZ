import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';

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
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #6c63ff;
  }
`;

const ExitButton = styled.button`
  background-color: #343a40;
  color: #fff;
  border: none;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #212529;
  }
`;

const AdminHeader: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <HeaderContainer>
      <Logo>fiscolab</Logo>
      <Nav>
        <NavLink>Página Inicial</NavLink>
        <NavLink>Cursos</NavLink>
        <NavLink>Sobre Nós</NavLink>
        <ExitButton onClick={handleLogout}>Sair</ExitButton>
      </Nav>
    </HeaderContainer>
  );
};

export default AdminHeader;