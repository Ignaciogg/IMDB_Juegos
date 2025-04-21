import React from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useGame } from "../hooks/useGame";
import GameDetails from "../components/GameDetails";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const GamePage: React.FC = () => {
  const { theme } = useTheme();
  const { id } = useParams<{ id: string }>();
  const { game, loading, error } = useGame(id);

  if (loading) {
    return <LoadingSpinner message="Loading game..." />;
  }

  if (error || !game) {
    return <ErrorMessage message={error || "Game not found!"} />;
  }

  return <GameDetails game={game} />;
};

export default GamePage;