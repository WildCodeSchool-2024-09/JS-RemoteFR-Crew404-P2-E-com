import CartInfo from "./Cart/CartInfo";
function Cart() {
  const carts = [
    {
      id: "1",
      name: "Casque Bluetooth",
      description: "Casque sans fil avec réduction de bruit active.",
      price: 89.99,
      image: "/assets/images/casque-bluetooth.jpg",
      stock: 15,
      category: "Audio",
    },
    {
      id: "2",
      name: "Montre Connectée",
      description:
        "Montre connectée avec suivi des activités et notifications.",
      price: 120.0,
      image: "/assets/images/montre-connectee.jpg",
      stock: 30,
      category: "Wearable",
    },
    {
      id: "3",
      name: "Sac à Dos Étanche",
      description: "Sac à dos durable et résistant à l'eau.",
      price: 49.99,
      image: "/assets/images/sac-a-dos-etanche.jpg",
      stock: 20,
      category: "Bagagerie",
    },
  ];

  return (
    <section>
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
            Ton panier d'achat
          </h2>

          {carts.map((product) => (
            <CartInfo key={product.id} product={product} />
          ))}
          <div className="flex flex-col md:flex-row items-center md:items-center justify-between lg:px-6 pb-6 border-b border-gray-200 max-lg:max-w-lg max-lg:mx-auto">
            <h5 className="text-gray-900 font-manrope font-semibold text-2xl leading-9 w-full max-md:text-center max-md:mb-4">
              Sous total
            </h5>

            <div className="flex items-center justify-between gap-5 ">
              <h6 className="font-manrope font-bold text-3xl lead-10 text-indigo-600">
                $220
              </h6>
            </div>
          </div>
          <div className="max-lg:max-w-lg max-lg:mx-auto">
            <p className="font-normal text-base leading-7 text-gray-500 text-center mb-5 mt-6">
              Les taxes d'expédition et les remises sont calculées au moment du
              paiement.
            </p>
            <button
              className="rounded-full py-4 px-6 bg-indigo-600 text-white font-semibold text-lg w-full text-center transition-all duration-500 hover:bg-indigo-700"
              type="button"
            >
              Passer à la caisse
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Cart;
