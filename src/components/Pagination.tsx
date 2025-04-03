import React from 'react';
import styles from '../assets/css/Catalog.module.css'; 

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
  theme: string;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, paginate, theme }) => (
  totalPages > 1 ? (
    <div className={styles.pagination}>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => paginate(i + 1)}
          className={`${styles.pageButton} ${currentPage === i + 1 ? styles.active : ''} ${styles[theme]}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  ) : null
);

export default Pagination;