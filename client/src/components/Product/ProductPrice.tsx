interface ProductPriceProps {
  price: number;
  stock: number;
}

function ProductPrice({ price, stock }: ProductPriceProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-2xl font-bold text-gray-900">
        {price.toFixed(2)} €
      </div>
      <div
        className={`px-3 py-1 rounded-full text-sm ${
          stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
      >
        {stock > 0 ? `${stock} in stock` : "Out of stock"}
      </div>
    </div>
  );
}

export default ProductPrice;
