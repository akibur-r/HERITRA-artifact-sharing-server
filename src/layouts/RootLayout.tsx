import { Navbar } from "@/components/shared/Navbar/Navbar";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="bg-background font-dm-sans">
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>footer</footer>
    </div>
  );
};

export default RootLayout;
