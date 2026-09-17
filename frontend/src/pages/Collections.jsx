import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCollections, getProducts } from "../api/client";
import ProductCard from "../components/ProductCard";
import CollectionCircle from "../components/CollectionCircle";

export default function Collections() {
  const [collections, setCollections] = useState([]);
  const [products, setProducts] = useState([]);
  const [params] = useSearchParams();
  const active = params.get("c") || "";

  useEffect(() => {
    getCollections().then(setCollections);
  }, []);

  useEffect(() => {
    getProducts(active ? { collection: active } : {}).then(setProducts);
  }, [active]);

  const activeCollection = collections.find((c) => c.slug === active);

  return (
    <div className="container-x py-10 md:py-14">
      <h1 className="section-heading mb-8">Collections</h1>
      <div className="flex gap-6 md:gap-10 overflow-x-auto scroll-row pb-2 mb-10">
        {collections.map((c) => (
          <CollectionCircle key={c.slug} collection={c} />
        ))}
      </div>

      <h2 className="font-display text-2xl mb-6">
        {activeCollection ? activeCollection.name : "All Pieces"}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
