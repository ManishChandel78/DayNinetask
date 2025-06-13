import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("https://dummyjson.com/products");
      setData(response.data.products);
      setFilter(response.data.products);
      setTimeout(() => {
        setIsLoading(false);
      }, 4000);
    } catch (error) {
      console.error(error);
    }
  };

  const searchMovie = () => {
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilter(filtered);
  };

  const deleteProducts = async (id) => {
    try {
      await axios.delete(`https://dummyjson.com/products/${id}`);

      const updatedData = data.filter((item) => item.id !== id);
      setData(updatedData);
      setFilter(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-center py-2 mt-4 font-medium">
        Welcome To Dashboard, here are your Products
      </h1>

      <div className="flex justify-between items-center px-4 mb-4">
        <div className="flex items-center">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search by title"
            className="py-2 px-4 border outline-neutral-500 rounded"
          />
          <button
            onClick={searchMovie}
            className="py-2 px-4 bg-gray-700 text-white mx-2 rounded"
          >
            Search
          </button>
        </div>

        <div>
          <button
            className="py-2 px-4 bg-gray-700 text-white rounded"
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="text-xl font-semibold animate-pulse text-gray-700">
            Loading products...
          </div>
        </div>
      ) : (
        <div className="grid gap-6 p-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-gray-100">
          {filter.map(({ id, title, description, thumbnail }) => (
            <section
              key={id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={thumbnail}
                alt={title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">
                  {title}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {description}
                </p>
              </div>
              <button
                onClick={() => deleteProducts(id)}
                className="py-2 px-4 rounded-xl text-white bg-red-700 flex justify-self-end mx-2 mb-2"
              >
                Delete
              </button>
            </section>
          ))}
        </div>
      )}
    </>
  );
};

export default DashBoard;
