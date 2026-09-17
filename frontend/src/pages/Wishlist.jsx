import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

export default function Wishlist() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="section-heading">Your wishlist is empty</h1>
        <p className="text-ink/50 mt-2">Tap the heart on anything you're not ready to commit to yet.</p>
        <Link to="/women" className="btn-dark mt-6 inline-flex">Browse Pieces</Link>
      </div>
    );
  }

  return (
    <div className="container-x py-10 md:py-14">
      <h1 className="section-heading mb-8">Your Wishlist</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
        {items.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
