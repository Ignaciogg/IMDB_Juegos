import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "../assets/css/SearchBar.module.css";
import { useTheme } from "../context/ThemeContext";

interface SearchBarWithOptionsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  options: string[];
  placeholder: string;
  onOptionSelect: (category: string) => void;
}

const SearchBarWithOptions: React.FC<SearchBarWithOptionsProps> = ({
  searchQuery,
  setSearchQuery,
  options,
  placeholder,
  onOptionSelect,
}) => {
  const { theme } = useTheme();
  const [inputValue, setInputValue] = useState(searchQuery);
  const [isFocused, setIsFocused] = useState(false);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleOptionClick = (option: string) => {
    setInputValue(option);
    setSearchQuery(option);
    onOptionSelect(option);
    setIsFocused(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && filteredOptions.length > 0) {
      const selected = filteredOptions[0];
      setInputValue(selected);
      setSearchQuery(selected);
      onOptionSelect(selected);
      setIsFocused(false);
    }
  };

  return (
    <div className={`${styles.searchContainer} ${theme}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 150)}
        onKeyDown={handleKeyPress}
        className={`${styles.searchInput} ${theme}`}
      />
      <div className={`${styles.searchIcon} ${theme}`}>
        <FaSearch />
      </div>
      {isFocused && filteredOptions.length > 0 && (
        <div className={`${styles.autocompleteContainer} ${theme}`}>
          {filteredOptions.map((option) => (
            <div
              key={option}
              onMouseDown={() => handleOptionClick(option)}
              className={`${styles.autocompleteOption} ${theme}`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBarWithOptions;