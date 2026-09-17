import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts, getCategories } from "../api/client";
import ProductCard from "../components/ProductCard";

export default function Shop({ gender, filter, title }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useSearchParams();

  const categoryFilter = params.get("category") || "";
  const search = params.get("search") || "";

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    const filters = {};
    if (gender) filters.gender = gender;
    if (filter === "new_arrival") filters.new_arrival = 1;
    if (filter === "best_seller") filters.best_seller = 1;
    if (categoryFilter) filters.category = categoryFilter;
    if (search) filters.search = search;

    getProducts(filters).then((p) => {
      if (isMounted) {
        setProducts(p || []);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [gender, filter, categoryFilter, search]);

  function handleCategoryClick(slug) {
    const newParams = new URLSearchParams(params);
    if (slug) {
      newParams.set("category", slug);
    } else {
      newParams.delete("category");
    }
    setParams(newParams);
  }

  const pageTitle = title || (gender === "women" ? "Women" : gender === "men" ? "Men" : "Shop");

  return (
    <div className="container-x py-10 md:py-14">
      <div className="mb-8">
        <h1 className="section-heading">{search ? `Results for "${search}"` : pageTitle}</h1>
        <p className="text-ink/50 text-sm mt-1">{products.length} pieces</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scroll-row">
        <button
          onClick={() => handleCategoryClick("")}
          className={`px-4 py-1.5 text-xs tracking-wide border whitespace-nowrap ${!categoryFilter ? "bg-ink text-ivory border-ink" : "border-line text-ink/60"}`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => handleCategoryClick(c.slug)}
            className={`px-4 py-1.5 text-xs tracking-wide border whitespace-nowrap ${categoryFilter === c.slug ? "bg-ink text-ivory border-ink" : "border-line text-ink/60"}`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-ink/40 text-sm py-20 text-center">Loading pieces...</p>
      ) : products.length === 0 ? (
        <p className="text-ink/40 text-sm py-20 text-center">No pieces match this filter yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
