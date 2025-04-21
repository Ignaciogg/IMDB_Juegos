import React from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSun, FaLanguage, FaUser } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import styles from "../assets/css/Header.module.css";
import { auth } from "../firebase";
const user = auth.currentUser;


const Header: React.FC = () => {
  const { theme, language, toggleTheme, changeLanguage } = useTheme();

  return (
    <header className={`${styles.headerContainer} ${styles[theme]}`}>
      <div className={styles.logo}>BoardGames Hub</div>
      <nav className={styles.nav}>
        <Link to="/" className={`${styles.navLink} ${styles[theme]}`}>
          Inicio
        </Link>
        <Link to="/catalog" className={`${styles.navLink} ${styles[theme]}`}>
          Catálogo
        </Link>
        <Link to="/rankings" className={`${styles.navLink} ${styles[theme]}`}>
          Rankings
        </Link>
        <Link to={user ? "/account" : "/log"}>
              <FaUser />
        </Link>
      </nav>
      <div className={styles.controls}>
        <button className={styles.iconButton} onClick={toggleTheme}>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
        
        <button
          className={styles.iconButton}
          onClick={() => changeLanguage(language === "es" ? "en" : "es")}
        >
          <FaLanguage /> {language.toUpperCase()}
        </button>
      </div>
    </header>
  );
};

export default Header;
