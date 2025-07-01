import Footer from "@/components/shared/Footer/Footer";
import { Navbar } from "@/components/shared/Navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="bg-background font-dm-sans relative">
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex main">
          <Outlet />
        </main>
      </div>
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default RootLayout;
