import React from "react";
import styles from "../assets/css/ErrorMessage.module.css"; 

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <div className={styles.errorContainer}>{message}</div>;
};

export default ErrorMessage;