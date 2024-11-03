import { useNavigate } from "react-router-dom";
import { useSearch } from "../../../context/SearchContext";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm } = useSearch();
  const handleFavoritesClick = () => {
    navigate("/favorite");
  };

  const handleMainPage = () => {
    navigate("/");
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <nav className="grid grid-cols-3 items-center p-4 bg-gray-800 text-white">
      <div
        onClick={handleMainPage}
        className="text-2xl font-bold cursor-pointer"
      >
        CatsGallery
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search by name..."
        className="px-4 py-2 rounded text-gray-800"
      />

      <button
        onClick={handleFavoritesClick}
        className="justify-self-end px-4 py-2 bg-white text-gray-800 rounded hover:bg-blue-500 hover:text-white transition-colors"
      >
        My favorites
      </button>
    </nav>
  );
};

export default Navbar;
