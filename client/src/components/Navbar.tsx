import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useCart } from "../context/CartContext";
import { fetchData } from "../helpers/fetch";
function Navbar() {
  const [categories, setCategories] = useState([]);
  const { nbCart } = useCart();

  // Fetch all categories on initial render
  useEffect(() => {
    // Fetch all categories
    const fetchDataAsync = async () => {
      const data = await fetchData("categories");
      setCategories(data);
    };
    fetchDataAsync();
  }, []);

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center ">
        <Link
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          to="/"
        >
          <img src={logo} alt="logo" className="w-12 h-12" />
          <span className="ml-3 text-xl">404 - E SHOP!</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to="/" className="mr-5 hover:text-gray-900">
            Home
          </Link>
          <div className="mr-5 hover:text-gray-900 flex">
            <span className="mr-2 mt-[.4rem]">Catégorie</span>
            <select
              id="location"
              name="location"
              defaultValue="Canada"
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm/6"
            >
              <option value="-">Choisir</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </nav>
        <Link
          to="/cart"
          className="relative inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
          type="button"
        >
          Panier
          <span className="absolute top-0 right-0 inline-flex items-center gap-x-1.5 rounded-full bg-indigo-100 px-1.5 py-0.5 text-xs font-medium text-indigo-700 transform translate-x-1/2 -translate-y-1/2">
            <svg
              viewBox="0 0 6 6"
              aria-hidden="true"
              className="size-1.5 fill-indigo-500"
            >
              <circle r={3} cx={3} cy={3} />
            </svg>
            {nbCart}
          </span>
          <ShoppingCart className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
