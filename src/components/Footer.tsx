import React from "react";
import { useTheme } from "../context/ThemeContext";
import styles from "../assets/css/Footer.module.css";

const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer className={`${styles.footer} ${styles[theme]}`}>
      <p>© {new Date().getFullYear()} BoardGames Hub - Todos los derechos reservados</p>
    </footer>
  );
};

export default Footer;
