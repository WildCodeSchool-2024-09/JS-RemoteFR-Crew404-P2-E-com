import { useEffect, useState } from "react";
import ProductCard from "./components/Product/ProductCard";
import type { Product } from "./types/product";
function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3310/api/items");
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <section>
      <h1 className="text-3xl font-semibold text-gray-900">Products</h1>
      <div className="grid grid-cols-2 gap-8 mt-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default App;
