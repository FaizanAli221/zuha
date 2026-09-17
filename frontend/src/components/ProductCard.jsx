import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

function formatPKR(n) {
  return `Rs.${Number(n).toLocaleString("en-PK")}`;
}

export default function ProductCard({ product }) {
  const { toggle, isWishlisted } = useWishlist();
  const { addItem } = useCart();
  const wished = isWishlisted(product.id);
  const sizes = (product.sizes || "").split(",").filter(Boolean);

  return (
    <div className="group">
      <div className="relative overflow-hidden bg-parchment aspect-[3/4]">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </Link>
        {product.is_best_seller ? (
          <span className="absolute top-3 left-3 bg-ink text-ivory text-[10px] tracking-wide px-2.5 py-1">BEST SELLER</span>
        ) : product.is_new_arrival ? (
          <span className="absolute top-3 left-3 bg-maroon text-ivory text-[10px] tracking-wide px-2.5 py-1">NEW</span>
        ) : null}
        <button
          onClick={() => toggle(product)}
          aria-label="Toggle wishlist"
          className="absolute top-3 right-3 w-8 h-8 bg-ivory/90 rounded-full flex items-center justify-center"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill={wished ? "#6E2A2A" : "none"} stroke={wished ? "#6E2A2A" : "#1C1B19"} strokeWidth="1.5">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
          </svg>
        </button>
        <button
          onClick={() => addItem(product, { size: sizes[0], quantity: 1 })}
          className="absolute bottom-0 left-0 right-0 bg-ink text-ivory text-xs tracking-wide py-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
        >
          ADD TO CART
        </button>
      </div>

      <Link to={`/product/${product.slug}`} className="block mt-3">
        <p className="text-[11px] tracking-wide text-ink/50 uppercase">{product.category_name || product.fabric}</p>
        <h3 className="text-sm mt-0.5 leading-snug">{product.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm">{formatPKR(product.price)}</span>
          {product.compare_at_price && (
            <span className="text-xs text-ink/40 line-through">{formatPKR(product.compare_at_price)}</span>
          )}
        </div>
        <div className="flex items-center gap-1 mt-1 text-gold text-xs">
          {"★".repeat(Math.round(product.rating))}
          <span className="text-ink/40">({product.review_count})</span>
        </div>
      </Link>
    </div>
  );
}
