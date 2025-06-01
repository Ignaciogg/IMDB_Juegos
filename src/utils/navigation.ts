import { NavigateFunction } from "react-router-dom";

export const navigateToReview = (
  user: any,
  gameId: string,
  navigate: NavigateFunction
) => {
  if (!user) {
    navigate("/log");
  } else {
    navigate(`/games/${gameId}/review`);
  }
};