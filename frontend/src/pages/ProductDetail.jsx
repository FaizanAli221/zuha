import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../api/client";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function formatPKR(n) {
  return `Rs.${Number(n).toLocaleString("en-PK")}`;
}

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  useEffect(() => {
    setProduct(null);
    getProduct(slug).then((p) => {
      setProduct(p);
      if (p) {
        setSize((p.sizes || "").split(",")[0] || "");
        setColor((p.colors || "").split(",")[0] || "");
      }
    });
  }, [slug]);

  if (!product) {
    return <div className="container-x py-24 text-center text-ink/40">Loading...</div>;
  }

  const sizes = (product.sizes || "").split(",").filter(Boolean);
  const colors = (product.colors || "").split(",").filter(Boolean);
  const wished = isWishlisted(product.id);

  function handleAdd() {
    addItem(product, { size, color, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="container-x py-10 md:py-14">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 aspect-[3/4] overflow-hidden bg-parchment">
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {product.image_url_alt && (
            <div className="col-span-2 aspect-[3/4] overflow-hidden bg-parchment">
              <img src={product.image_url_alt} alt={`${product.name} alternate view`} className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <div>
          <p className="text-xs tracking-wide text-ink/50 uppercase">{product.category_name || product.fabric}</p>
          <h1 className="font-display text-3xl md:text-4xl mt-2">{product.name}</h1>
          <div className="flex items-center gap-2 mt-3 text-gold text-sm">
            {"★".repeat(Math.round(product.rating))}
            <span className="text-ink/40">({product.review_count} reviews)</span>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <span className="text-xl">{formatPKR(product.price)}</span>
            {product.compare_at_price && (
              <span className="text-ink/40 line-through">{formatPKR(product.compare_at_price)}</span>
            )}
          </div>

          <p className="mt-6 text-ink/60 leading-relaxed max-w-md">{product.description}</p>
          <p className="mt-3 text-sm text-ink/50">Fabric: {product.fabric}</p>

          {colors.length > 0 && (
            <div className="mt-6">
              <p className="text-xs tracking-wide uppercase text-ink/50 mb-2">Colour</p>
              <div className="flex gap-2 flex-wrap">
                {colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`px-4 py-2 text-xs border ${color === c ? "border-ink bg-ink text-ivory" : "border-line"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {sizes.length > 0 && (
            <div className="mt-6">
              <p className="text-xs tracking-wide uppercase text-ink/50 mb-2">Size</p>
              <div className="flex gap-2 flex-wrap">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 text-xs border min-w-[3rem] ${size === s ? "border-ink bg-ink text-ivory" : "border-line"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex gap-3">
            <button onClick={handleAdd} className="btn-dark flex-1">
              {added ? "Added to Cart ✓" : "Add to Cart"}
            </button>
            <button
              onClick={() => toggle(product)}
              aria-label="Toggle wishlist"
              className={`w-12 h-12 flex items-center justify-center border ${wished ? "border-maroon" : "border-line"}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={wished ? "#6E2A2A" : "none"} stroke={wished ? "#6E2A2A" : "#1C1B19"} strokeWidth="1.5">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
              </svg>
            </button>
          </div>

          <Link to="/cart" className="block mt-4 text-sm text-maroon underline underline-offset-4">
            View cart &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
