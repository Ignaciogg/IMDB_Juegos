import React from "react";
import styles from "../assets/css/Pagination.module.css";

// Define the props interface to include the theme and optional buttonClass
interface PaginationProps {
  totalPages: number;
  currentPage: number;
  paginate: (page: number) => void;
  theme: "light" | "dark";
  buttonClass?: string; // Add optional buttonClass prop
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  paginate,
  theme,
  buttonClass = "", // Default to empty string if not provided
}) => (
  <div className={`${styles.pagination} ${theme}`}>
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i + 1}
        onClick={() => paginate(i + 1)}
        className={`${styles.pageButton} ${theme} ${
          currentPage === i + 1 ? styles.active : ""
        } ${buttonClass}`} // Apply the custom buttonClass
      >
        {i + 1}
      </button>
    ))}
  </div>
);

export default Pagination;