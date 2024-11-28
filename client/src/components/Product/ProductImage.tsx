interface ProductImageProps {
  imageUrl: string;
  name: string;
}
function ProductImage({ imageUrl, name }: ProductImageProps) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
      <img
        src={`https://e-com-404.netlify.app/${imageUrl}`}
        alt={name}
        className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
}

export default ProductImage;
