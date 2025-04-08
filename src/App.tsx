// src/App.tsx
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle, ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider, useTheme, Theme } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import GamePage from './pages/GamePage'; // Import the GamePage component

// Definir el tema para styled-components
type StyledTheme = {
  mode: Theme;
};

const GlobalStyle = createGlobalStyle<{ theme: StyledTheme }>`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-color: ${props => props.theme.mode === 'light' ? '#ffffff' : '#121212'};
    color: ${props => props.theme.mode === 'light' ? '#212529' : '#f8f9fa'};
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  flex-grow: 1;
`;

// Componente intermedio para usar el hook useTheme
const AppContent: React.FC = () => {
  const { theme } = useTheme();
  const styledTheme = { mode: theme };
  
  return (
    <StyledThemeProvider theme={styledTheme}>
      <>
        <GlobalStyle theme={styledTheme} />
        <Router>
          <AppContainer>
            <Header />
            <Content>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/game/:id" element={<GamePage />} /> 
                <Route path="/rankings" element={<div>Página de Rankings (Por implementar)</div>} />
              </Routes>
            </Content>
            <Footer />
          </AppContainer>
        </Router>
      </>
    </StyledThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
