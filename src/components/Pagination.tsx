import React from "react";
import styles from "../assets/css/Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  paginate: (page: number) => void;
  theme: "light" | "dark";
  buttonClass?: string; 
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  paginate,
  theme,
  buttonClass = "", 
}) => (
  <div className={`${styles.pagination} ${theme}`}>
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i + 1}
        onClick={() => paginate(i + 1)}
        className={`${styles.pageButton} ${theme} ${
          currentPage === i + 1 ? styles.active : ""
        } ${buttonClass}`} 
      >
        {i + 1}
      </button>
    ))}
  </div>
);

export default Pagination;