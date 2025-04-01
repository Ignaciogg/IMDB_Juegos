// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaMoon, FaSun, FaLanguage } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const HeaderContainer = styled.header<{theme: 'light' | 'dark'}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${props => props.theme === 'light' ? '#f8f9fa' : '#343a40'};
  color: ${props => props.theme === 'light' ? '#212529' : '#f8f9fa'};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(Link)<{theme: 'light' | 'dark'}>`
  color: ${props => props.theme === 'light' ? '#212529' : '#f8f9fa'};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: inherit;
`;

const Header: React.FC = () => {
  const { theme, language, toggleTheme, changeLanguage } = useTheme();

  return (
    <HeaderContainer theme={theme}>
      <Logo>BoardGames Hub</Logo>
      <Nav>
        <NavLink to="/" theme={theme}>Inicio</NavLink>
        <NavLink to="/catalog" theme={theme}>Catálogo</NavLink>
        <NavLink to="/rankings" theme={theme}>Rankings</NavLink>
      </Nav>
      <Controls>
        <IconButton onClick={toggleTheme}>
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </IconButton>
        <IconButton onClick={() => changeLanguage(language === 'es' ? 'en' : 'es')}>
          <FaLanguage /> {language.toUpperCase()}
        </IconButton>
      </Controls>
    </HeaderContainer>
  );
};

export default Header;