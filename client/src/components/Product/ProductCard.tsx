import { ShoppingCart } from "lucide-react";
import type { Product } from "../../types/product";
import ProductImage from "./ProductImage";
import ProductPrice from "./ProductPrice";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductImage imageUrl={product.image} name={product.name} />

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-indigo-600 font-medium">
                {product.category}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-2">
              {product.name}
            </h1>
          </div>

          <ProductPrice price={product.price} stock={product.stock} />

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <button
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            type="button"
          >
            <ShoppingCart className="w-5 h-5" />
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
