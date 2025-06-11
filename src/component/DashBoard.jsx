import axios from "axios";
import { useEffect, useState } from "react";

const DashBoard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const fetchData = async () => {
    console.log("hey");
    try {
      setIsLoading(true);
      const response = await axios.get("https://dummyjson.com/products");
      setData(response.data.products);

      console.log(response);
      setTimeout(() => {
        setIsLoading(false);
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  };

  const searchMovie = () => {
    const Filter = data.filter((item) =>
      item.title.toLowerCase().include(search.toLocaleLowerCase)
    );
    setFilter(Filter);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-center py-2 mt-4 font-medium">
        WelCome To DashBoard, here is your Products
      </h1>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search by title"
        className="my-3 ml-4 py-2 px-4 border-1  outline-neutral-500 rounded"
      />
      <button
        onClick={searchMovie}
        className="py-2 px-4 bg-gray-500 text-white mx-2 rounded"
      >
        Search
      </button>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="text-xl font-semibold animate-pulse text-gray-700">
            Loading products...
          </div>
        </div>
      ) : (
        <div className="grid gap-6 p-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-gray-100">
          {data.map(({ id, title, description, thumbnail }) => (
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
            </section>
          ))}
        </div>
      )}
    </>
  );
};

export default DashBoard;
