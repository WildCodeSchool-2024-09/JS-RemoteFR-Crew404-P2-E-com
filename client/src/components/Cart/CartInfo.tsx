import { Trash } from "lucide-react";
import type { Product } from "../../types/product";
function CartInfo({ product }: { product: Product }) {
  return (
    <div className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4">
      <div className="col-span-12 lg:col-span-2 img box">
        <img
          src={`http://localhost:3310/${product.image}`}
          alt={product.name}
          className="max-lg:w-full lg:w-[180px] rounded-lg object-cover"
        />
      </div>
      <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
        <div className="flex items-center justify-between w-full mb-4">
          <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">
            {product.name}
          </h5>
          <button
            className="rounded-full group flex items-center justify-center focus-within:outline-red-500"
            type="button"
          >
            <Trash className="w-6 h-6 text-red-500 group-hover:text-red-600 transition-all duration-500" />
          </button>
        </div>
        <p className="font-normal text-base leading-7 text-gray-500 mb-6">
          {product.description}
        </p>
        <div className="flex justify-end">
          <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 text-right">
            {product.price}€
          </h6>
        </div>
      </div>
    </div>
  );
}

export default CartInfo;
