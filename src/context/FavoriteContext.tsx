import { createContext, useContext, useEffect, useState } from "react";

interface FavoriteContextType {
  favorites: string[];
  toggleFavorite: (catId: string) => void;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined,
);

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorite must be used within a FavoriteProvider");
  }
  return context;
};

export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteCats");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteCats", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (catId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(catId)
        ? prevFavorites.filter((id) => id !== catId)
        : [...prevFavorites, catId],
    );
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
