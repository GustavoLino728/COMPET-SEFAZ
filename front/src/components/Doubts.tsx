import React from 'react';
import styled from 'styled-components';
import { FaComments } from 'react-icons/fa';

const Banner = styled.div`
  background-color: #e9efff;
  padding: 2rem 2.5rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextContent = styled.div`
  h3 {
    font-size: 1.5rem;
    margin: 0 0 4px 0;
    color: #343a40;
  }
  p {
    margin: 0;
    color: #495057;
  }
`;

const GuideButton = styled.button`
  background-color: #495057;
  color: #fff;
  border: none;
  padding: 0.8rem 1.6rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #343a40;
  }
`;

const Doubts: React.FC = () => {
    return (
        <Banner>
            <TextContent>
                <h3>Dúvidas?</h3>
                <p>Conheça o nosso Atendente Virtual Guia.</p>
            </TextContent>
            <GuideButton>
                <FaComments size={18} />
                Fale com o Guia
            </GuideButton>
        </Banner>
    )
}

export default Doubts;