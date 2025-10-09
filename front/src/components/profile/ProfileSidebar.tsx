import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FaChartBar, FaUser, FaBriefcase, FaAward } from 'react-icons/fa';

const SidebarContainer = styled.aside`
  background: #fff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 1rem;
  height: fit-content;
`;
const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  text-decoration: none;
  color: #495057;
  font-weight: 600;
  transition: background-color 0.2s;

  &.active {
    background-color: #eef2ff;
    color: #5e60ce;
  }
  &:hover:not(.active) {
    background-color: #f8f9fa;
  }
`;

const ProfileSidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <NavItem to="/perfil/progresso"><FaChartBar /> Progresso</NavItem>
      <NavItem to="/perfil/pessoal"><FaUser /> Meu perfil</NavItem>
      <NavItem to="/perfil/profissional"><FaBriefcase /> Profissional</NavItem>
      <NavItem to="/perfil/insignias"><FaAward /> Insígnias</NavItem>
    </SidebarContainer>
  );
};
export default ProfileSidebar;