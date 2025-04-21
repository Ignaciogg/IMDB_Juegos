// src/App.tsx
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import styled, { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider, useTheme, Theme } from "./context/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import GamePage from "./pages/GamePage";
import "./styles/global.css"; // Import global.css
import LogIn from "./pages/LogIn";
import AccountPage  from "./pages/AccountPage";
import PrivateRoute from './routes/PrivateRoute';

type StyledTheme = {
  mode: Theme;
};

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  padding-left: 80px;
  padding-right: 80px;
  flex-grow: 1;
`;

const Content = styled.main`
  flex-grow: 1;
`;

const AppContent: React.FC = () => {
  const { theme } = useTheme();
  const styledTheme = { mode: theme };

  
  React.useEffect(() => {
    document.body.className = theme; // Set body class to 'light' or 'dark'
  }, [theme]);

  return (
    <StyledThemeProvider theme={styledTheme}>
      <Router>
        <AppContainer>
          <Header />
          <ContentContainer>
            <Content>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/game/:id" element={<GamePage />} />
                <Route path="/rankings" element={<div>Página de Rankings (Por implementar)</div>} />
                <Route path="/log" element={<LogIn />} />
               
                <Route path="/account" element={
                                                <PrivateRoute>
                                                  <AccountPage />
                                                </PrivateRoute>
                                              }
                                              />
              </Routes>
            </Content>
          </ContentContainer>
          <Footer />
        </AppContainer>
      </Router>
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