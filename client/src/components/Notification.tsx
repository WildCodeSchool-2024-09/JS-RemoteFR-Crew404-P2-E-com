import { useCart } from "../context/CartContext";

function Notification() {
  const { message } = useCart();

  return (
    message && (
      <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-md transition-opacity duration-300">
        {message}
      </div>
    )
  );
}

export default Notification;
