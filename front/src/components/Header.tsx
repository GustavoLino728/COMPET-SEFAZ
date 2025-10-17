import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';

const HeaderContainer = styled.header`
  background-color: #fff;
  padding: 1rem 2rem;
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

const NavLink = styled(Link)`
  text-decoration: none;
  color: #495057;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #5e60ce;
  }
`;

const ExitButton = styled.button`
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

const Header: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <HeaderContainer>
      <Logo>fiscolab</Logo>
      <Nav>
        <NavLink to="/">Início</NavLink>
        <NavLink to="/trilhas">Trilhas</NavLink>
        <NavLink to="/teste-perfil">Teste de perfil</NavLink>
        <NavLink to="/certificados">Certificações</NavLink>
        <ExitButton onClick={handleLogout}>Sair</ExitButton>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;