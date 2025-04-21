// src/hooks/useGamesPerPage.ts
import { useState, useEffect } from "react";

const useGamesPerPage = (initialGamesPerPage: number = 7) => {
  const [gamesPerPage, setGamesPerPage] = useState<number>(initialGamesPerPage);

  const updateGamesPerPage = () => {
    const width = window.innerWidth;
    if (width >= 1200) {
      setGamesPerPage(12); // Escritorio grande
    } else if (width >= 768) {
      setGamesPerPage(9); // Tabletas o escritorio pequeño
    } else {
      setGamesPerPage(6); // Móviles
    }
  };

  useEffect(() => {
    updateGamesPerPage(); // Establecer valor inicial
    window.addEventListener("resize", updateGamesPerPage); // Escuchar cambios de tamaño

    // Limpieza del event listener al desmontar
    return () => window.removeEventListener("resize", updateGamesPerPage);
  }, []);

  return gamesPerPage;
};

export default useGamesPerPage;