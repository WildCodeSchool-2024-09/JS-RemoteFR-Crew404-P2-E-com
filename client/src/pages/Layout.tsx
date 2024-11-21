import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Layout() {
  return (
    <main className="flex flex-col h-lvh">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div className="mx-auto max-w-3xl">
          <Outlet />
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default Layout;
