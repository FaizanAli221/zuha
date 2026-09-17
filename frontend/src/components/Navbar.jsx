import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/women", label: "Women" },
  { to: "/men", label: "Men" },
  { to: "/collections", label: "Collections" },
  { to: "/new-arrivals", label: "New Arrivals" },
  { to: "/best-sellers", label: "Best Sellers" },
  { to: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { count } = useCart();
  const { items: wishItems } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();

  function submitSearch(e) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/women?search=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  }

  return (
    <header className="bg-ink text-ivory sticky top-0 z-40">
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        <button
          className="md:hidden p-2 -ml-2"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <Link to="/" className="font-display text-2xl md:text-3xl tracking-wide select-none">
          ZUHA<span className="text-gold">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm tracking-wide">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `pb-1 border-b transition-colors ${isActive ? "border-gold text-gold" : "border-transparent hover:text-gold"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button aria-label="Search" onClick={() => setSearchOpen((s) => !s)} className="p-1">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <Link to="/wishlist" aria-label="Wishlist" className="relative p-1 hidden sm:inline-flex">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
            </svg>
            {wishItems.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-gold text-ink text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {wishItems.length}
              </span>
            )}
          </Link>
          <Link to={user ? "/account" : "/login"} aria-label="Account" className="p-1 hidden sm:inline-flex">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" />
            </svg>
          </Link>
          <Link to="/cart" aria-label="Cart" className="relative p-1">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 8h12l-1 12H7L6 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-gold text-ink text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-ivory/15 bg-ink">
          <form onSubmit={submitSearch} className="container-x py-3 flex items-center gap-3">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for kurtas, co-ords, odhnis..."
              className="flex-1 bg-transparent border-b border-ivory/40 py-1.5 text-sm placeholder:text-ivory/50 focus:outline-none focus:border-gold"
            />
            <button type="submit" className="text-sm text-gold">Search</button>
          </form>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button className="absolute inset-0 bg-black/50" aria-label="Close menu" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 bg-ivory text-ink p-6 flex flex-col gap-1">
            <div className="flex items-center justify-between mb-6">
              <span className="font-display text-xl">ZUHA.</span>
              <button onClick={() => setOpen(false)} aria-label="Close" className="p-1">✕</button>
            </div>
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className="py-3 border-b border-line text-sm tracking-wide"
              >
                {l.label}
              </NavLink>
            ))}
            <Link to={user ? "/account" : "/login"} onClick={() => setOpen(false)} className="py-3 border-b border-line text-sm tracking-wide">
              {user ? "My Account" : "Login / Register"}
            </Link>
            <Link to="/wishlist" onClick={() => setOpen(false)} className="py-3 text-sm tracking-wide">
              Wishlist
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
