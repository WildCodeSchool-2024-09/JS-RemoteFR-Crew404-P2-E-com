import { useEffect, useState } from "react";
import ProductCard from "./components/Product/ProductCard";
import { fetchData } from "./helpers/fetch";
import type { Product } from "./types/product";
function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const data = await fetchData("items");
      setProducts(data);
    };
    fetchDataAsync();
  }, []);

  return (
    <section>
      <h1 className="text-3xl font-semibold text-gray-900">Products</h1>
      <div className="grid grid-cols-2 gap-8 mt-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} isBuy />
        ))}
      </div>
    </section>
  );
}

export default App;
