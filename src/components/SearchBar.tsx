import React from "react";
import { FaSearch } from "react-icons/fa";
import styles from "../assets/css/SearchBar.module.css";
import { useTheme } from "../context/ThemeContext";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, placeholder }) => {
  const { theme } = useTheme(); // Access the current theme

  return (
    <div className={`${styles.searchContainer} ${theme}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={`${styles.searchInput} ${theme}`}
      />
      <div className={`${styles.searchIcon} ${theme}`}>
        <FaSearch />
      </div>
    </div>
  );
};

export default SearchBar;