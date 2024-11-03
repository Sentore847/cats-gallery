import { useQuery } from "@tanstack/react-query";
import { useFavorite } from "../../../context/FavoriteContext";
import { useSearch } from "../../../context/SearchContext";
import axios from "axios";

interface Image {
  url: string;
}

export interface Cat {
  id: string;
  name: string;
  description: string;
  image?: Image;
}

export const getData = async () => {
  const res = await axios.get(
    "https://api.thecatapi.com/v1/breeds?api_key=live_UUpJ4dyYshuwcnZacrWPwM0lqNdOn3UgAZk94ZX9F9IeGUblH1tc4JY9MNfIKuo0",
  );
  return res.data;
};

const MainPage: React.FC = () => {
  const { searchTerm } = useSearch();

  const { favorites, toggleFavorite } = useFavorite();

  const { data, error, isSuccess } = useQuery<Cat[], Error>({
    queryKey: ["cats"],
    queryFn: getData,
  });

  if (error) return <div>Error: {error.message}</div>;
  if (!isSuccess || !data) return <div>Loading...</div>;

  const filteredCats = data.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="py-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">Cats</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4">
        {filteredCats.map((cat) => {
          const isFavorite = favorites.includes(cat.id);
          return (
            <div
              key={cat.id}
              className={`cat-card ${isFavorite ? "favorite" : ""}`}
            >
              {cat.image ? (
                <img
                  className="cat-card-image"
                  src={cat.image.url}
                  alt={cat.name}
                />
              ) : (
                <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                  <span>No Image Available</span>
                </div>
              )}
              <div className="cat-card-content">
                <h2 className="cat-card-title">{cat.name}</h2>
                <p className="cat-card-description">
                  {cat.description.length > 165
                    ? `${cat.description.slice(0, 165)}...`
                    : cat.description}
                </p>
                <button
                  onClick={() => toggleFavorite(cat.id)}
                  className={`favorite-button ${isFavorite ? "favorited" : ""}`}
                >
                  {isFavorite ? "Favorited" : "Add to favorites"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainPage;
