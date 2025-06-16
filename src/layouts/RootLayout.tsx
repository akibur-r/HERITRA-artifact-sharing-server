import Footer from "@/components/shared/Footer/Footer";
import { Navbar } from "@/components/shared/Navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="bg-background font-dm-sans">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default RootLayout;
