import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AnnouncementBar from "./components/AnnouncementBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Collections from "./pages/Collections";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Contact from "./pages/Contact";
import WhatsAppWidget from "./components/WhatsAppWidget";

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname, search]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <ScrollToTop />
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/women" element={<Shop gender="women" />} />
          <Route path="/men" element={<Shop gender="men" />} />
          <Route path="/new-arrivals" element={<Shop filter="new_arrival" title="New Arrivals" />} />
          <Route path="/best-sellers" element={<Shop filter="best_seller" title="Best Sellers" />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
