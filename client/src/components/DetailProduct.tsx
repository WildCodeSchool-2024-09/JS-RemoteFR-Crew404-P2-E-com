import { useLoaderData } from "react-router-dom";
import type { Product } from "../types/product";
import ProductCard from "./Product/ProductCard";

function DetailProduct() {
  const product = useLoaderData() as Product;

  return (
    <section>
      <ProductCard product={product} isBuy />
    </section>
  );
}

export default DetailProduct;
