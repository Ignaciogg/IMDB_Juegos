// src/components/Footer.tsx
import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const FooterContainer = styled.footer<{theme: 'light' | 'dark'}>`
  padding: 1.5rem;
  background-color: ${props => props.theme === 'light' ? '#f8f9fa' : '#343a40'};
  color: ${props => props.theme === 'light' ? '#212529' : '#f8f9fa'};
  text-align: center;
  margin-top: auto;
`;

const Footer: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <FooterContainer theme={theme}>
      <p>© {new Date().getFullYear()} BoardGames Hub - Todos los derechos reservados</p>
    </FooterContainer>
  );
};

export default Footer;