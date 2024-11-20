import { useLoaderData } from "react-router-dom";
import type { Product } from "../types/product";
import ProductCard from "./Product/ProductCard";

function UniqueProduct() {
  const { product } = useLoaderData() as { product: Product };
  return (
    <section>
      <h1 className="text-3xl font-bold text-gray-900 my-2">{product.name}</h1>
      <ProductCard product={product} />
    </section>
  );
}

export default UniqueProduct;
