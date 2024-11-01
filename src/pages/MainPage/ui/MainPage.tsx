import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Image {
  url: string;
}

interface Cat {
  id: string;
  name: string;
  description: string;
  image?: Image;
}

const getData = async () => {
  const res = await axios.get(
    "https://api.thecatapi.com/v1/breeds?api_key=live_UUpJ4dyYshuwcnZacrWPwM0lqNdOn3UgAZk94ZX9F9IeGUblH1tc4JY9MNfIKuo0"
  );

  return res.data;
};

const MainPage: React.FC = () => {
  const { data, error, isSuccess } = useQuery<Cat[], Error>({
    queryKey: ["cats"],
    queryFn: getData,
  });

  console.log(error, isSuccess);

  if (error) return <div>Error: {error.message}</div>;
  if (!isSuccess || !data) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Main Page</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((cat) => (
          <div
            key={cat.id}
            className="border rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            {cat.image ? (
              <img
                className="w-full h-48 object-cover"
                src={cat.image.url}
                alt={cat.name}
              />
            ) : (
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                <span>No Image Available</span>
              </div>
            )}
            <div className="p-4">
              <h2 className="text-lg font-semibold">{cat.name}</h2>
              <p className="text-gray-600">
                {cat.description.length > 130
                  ? `${cat.description.slice(0, 130)}...`
                  : cat.description}
              </p>
              <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                Add to favorites
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
