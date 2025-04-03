import notFound from "../assets/images/not-found.jpg"
import { Game } from "../types";
/* usando https://boardgamegeek.com/wiki/page/BGG_XML_API2 */
export async function fetchBGGGame(gameId: number) {
    const response = await fetch(`https://boardgamegeek.com/xmlapi2/thing?id=${gameId}`);
    const xmlText = await response.text();
  
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
  
    return {
      id: gameId,
      name: xmlDoc.querySelector("name")?.getAttribute("value") || "Unknown",
      image: xmlDoc.querySelector("image")?.textContent || notFound,
      rating: parseFloat(xmlDoc.querySelector("average")?.getAttribute("value") || "0"),
      totalRatings: parseInt(xmlDoc.querySelector("usersrated")?.getAttribute("value") || "0"),
      categories: Array.from(xmlDoc.querySelectorAll("link[type='boardgamecategory']"))
        .map(link => link.getAttribute("value") || "Unknown"),
      minPlayers: parseInt(xmlDoc.querySelector("minplayers")?.getAttribute("value") || "1"),
      maxPlayers: parseInt(xmlDoc.querySelector("maxplayers")?.getAttribute("value") || "1"),
      description: xmlDoc.querySelector("description")?.textContent || "No description available.",
    };
  }
  export async function fetchPopularGames(): Promise<number[]> {
    const response = await fetch("https://boardgamegeek.com/xmlapi2/hot?type=boardgame");
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
  
    
    const items = Array.from(xmlDoc.querySelectorAll("item"));
    const ids = items.map((item) => {
      const idStr = item.getAttribute("id");
      return idStr ? parseInt(idStr) : NaN;
    }).filter((id) => !isNaN(id));
  
    return ids;
  }

  export async function fetchBGGGameByName(query: string): Promise<Game[]> {
    try {
      const response = await fetch(
        `https://boardgamegeek.com/xmlapi2/search?type=boardgame&query=${encodeURIComponent(query)}`
      );
      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");
  
      const items = Array.from(xmlDoc.querySelectorAll("item"));
      const gameIds = items.map(item => parseInt(item.getAttribute("id") || "0")).filter(id => id > 0);
  
    
      const gamesData = await Promise.all(gameIds.slice(0, 25).map(id => fetchBGGGame(id)));
      return gamesData;
    } catch (error) {
      console.error("Error fetching search results from BGG API:", error);
      return [];
    }
  }
  