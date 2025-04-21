import React from "react";
import styles from "../assets/css/FilterBar.module.css";


interface FilterBarProps {
  players: number;
  setPlayers: (players: number) => void;
  theme: "light" | "dark"; 
}

const FilterBar: React.FC<FilterBarProps> = ({ players, setPlayers, theme }) => (
  <div className={`${styles.filterBarContainer} ${theme}`}>
    <label className={`${styles.filterLabel} ${theme}`}>
      Players: {players}
    </label>
    <div className={`${styles.rangeContainer} ${theme}`}>
      <input
        type="range"
        min="1"
        max="10"
        value={players}
        onChange={(e) => setPlayers(parseInt(e.target.value))}
        className={`${styles.rangeInput} ${theme}`} 
      />
      <div className={`${styles.rangeValue} ${theme}`}>
        <span>1</span>
        <span>10</span>
      </div>
    </div>
  </div>
);

export default FilterBar;