import { useFavorite } from "../../../context/FavoriteContext";
import { Cat, getData } from "../../MainPage/ui/MainPage";
import { useQuery } from "@tanstack/react-query";
import { useSearch } from "../../../context/SearchContext";

const FavoritePage: React.FC = () => {
  const { favorites } = useFavorite();
  const { data, error, isSuccess } = useQuery<Cat[], Error>({
    queryKey: ["cats"],
    queryFn: getData,
  });

  const { searchTerm } = useSearch();

  if (error) return <div>Error: {error.message}</div>;
  if (!isSuccess || !data) return <div>Loading...</div>;

  const filteredCats = data.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const favoriteCats = filteredCats.filter((cat) => favorites.includes(cat.id));

  if (favoriteCats.length === 0)
    return <div className="py-8 text-center">No favorite cats found.</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">Favorite Cats</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {favoriteCats.map((cat) => (
          <div key={cat.id} className="cat-card">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritePage;
