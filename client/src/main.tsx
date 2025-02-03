// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";

/* ************************************************************************* */

// Import the main app component
import App from "./App";
import Cart from "./components/Cart";
import Notification from "./components/Notification";
import Product from "./components/UniqueProduct";
import { fetchData } from "./helpers/fetch";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import SignIn from "./pages/Signin";

import { AuthProvider } from "./context/AuthContext";
/**
 * Context
 */
import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./pages/ProtectedRoute";

// Import additional components for new routes
// Try creating these components in the "pages" folder

// import About from "./pages/About";
// import Contact from "./pages/Contact";

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!
const router = createBrowserRouter([
  {
    element: <Layout />, // Renders the App component for the home page
    children: [
      {
        path: "/", // The root path
        element: <App />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/products/:id",
        element: <Product />,
        loader: async ({ params }) => {
          const [product] = await fetchData(`items/${params.id}`);
          return { product };
        },
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/cart",
            element: <Cart />,
          },
        ],
      },
    ],
  },
  // Try adding a new route! For example, "/about" with an About component
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
        <Notification />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
