import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, getCollections, getCategories } from "../api/client";
import ProductCard from "../components/ProductCard";
import CollectionCircle from "../components/CollectionCircle";
import CategoryCard from "../components/CategoryCard";
import Newsletter from "../components/Newsletter";

const community = [
  { img: "https://placehold.co/500x650/1c1b19/f6f2ea?text=%40amna.k", caption: "@amna.k in the Ilma Kurta" },
  { img: "https://placehold.co/500x650/6e2a2a/f6f2ea?text=%40hcreates", caption: "@hcreates in the Saher Co-Ord" },
  { img: "https://placehold.co/500x650/b9975b/1c1b19?text=%40zaraw", caption: "@zaraw in the Zoya Odhni" },
  { img: "https://placehold.co/500x650/6b7156/f6f2ea?text=%40mnaqvi", caption: "@mnaqvi in the Aiza Shrug" },
];

const stories = [
  {
    img: "https://placehold.co/700x460/1c1b19/f6f2ea?text=Meet+Our+Weavers",
    title: "Meet the Weavers of Bahawalpur",
    date: "Sep 2, 2026",
  },
  {
    img: "https://placehold.co/700x460/6e2a2a/f6f2ea?text=Styling+the+Odhni",
    title: "Five Ways to Style an Odhni",
    date: "Aug 14, 2026",
  },
  {
    img: "https://placehold.co/700x460/6b7156/f6f2ea?text=Festive+Edit",
    title: "Inside the Festive Edit",
    date: "Jul 28, 2026",
  },
];

export default function Home() {
  const [bestSellers, setBestSellers] = useState([]);
  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getProducts({ best_seller: 1, limit: 4 }).then(setBestSellers);
    getCollections().then(setCollections);
    getCategories().then(setCategories);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-parchment">
        <div className="grid md:grid-cols-2 items-stretch">
          <div className="order-2 md:order-1 flex flex-col justify-center px-6 md:px-14 py-14 md:py-0">
            <p className="text-xs tracking-[0.2em] text-maroon uppercase mb-4">Autumn Edit</p>
            <h1 className="font-display text-4xl md:text-6xl leading-[1.05] max-w-md">
              Tradition, worn lightly
            </h1>
            <p className="mt-5 text-ink/60 max-w-sm leading-relaxed">
              Hand-finished kurtas, easy co-ord sets and unstitched lawn, cut
              for the way you actually move through your day.
            </p>
            <div className="mt-8 flex gap-4">
              <Link to="/women" className="btn-dark">Shop Women</Link>
              <Link to="/men" className="btn-light">Shop Men</Link>
            </div>
          </div>
          <div className="order-1 md:order-2 aspect-[4/5] md:aspect-auto">
            <img
              src="https://placehold.co/1000x1200/2a2926/f6f2ea?text=ZUHA+Autumn+Edit"
              alt="ZUHA autumn edit campaign"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Shop by Collection */}
      <section className="container-x py-14">
        <h2 className="section-heading mb-8">Shop by Collection</h2>
        <div className="flex gap-6 md:gap-10 overflow-x-auto scroll-row pb-2">
          {collections.map((c) => (
            <CollectionCircle key={c.slug} collection={c} />
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-parchment">
        <div className="container-x py-14">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="section-heading">Best Sellers</h2>
              <p className="text-ink/50 text-sm mt-1">Explore what's trending this week</p>
            </div>
            <Link to="/best-sellers" className="btn-dark hidden sm:inline-flex">Explore All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
            {bestSellers.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <Link to="/best-sellers" className="btn-dark mt-8 sm:hidden inline-flex">Explore All</Link>
        </div>
      </section>

      {/* Look of the Week */}
      <section className="container-x py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src="https://placehold.co/700x900/6b7156/f6f2ea?text=Look+of+the+Week"
              alt="Look of the week"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="section-heading">Look of the Week</h2>
            <div className="text-gold mt-3">★★★★★</div>
            <p className="mt-4 text-ink/60 max-w-sm leading-relaxed">
              "The Alvira set has genuinely become my go-to -- the fabric
              breathes, the cut is forgiving, and it travels well folded in a
              carry-on. Already thinking about which colour to get next."
            </p>
            <Link to="/product/alvira-kaftan-set" className="btn-dark mt-6 inline-flex">Shop This Look</Link>
          </div>
        </div>
      </section>

      {/* Trending Categories */}
      <section className="bg-parchment">
        <div className="container-x py-16">
          <h2 className="section-heading mb-1">Trending Categories</h2>
          <p className="text-ink/50 text-sm mb-8">The pieces everyone keeps coming back for</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((c) => (
              <CategoryCard key={c.slug} category={c} />
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="container-x py-16">
        <h2 className="section-heading mb-1">Wear It, Share It</h2>
        <p className="text-ink/50 text-sm mb-8">Tag @zuha.official to be featured</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {community.map((item) => (
            <div key={item.caption} className="group">
              <div className="aspect-[3/4] overflow-hidden">
                <img src={item.img} alt={item.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <p className="text-xs text-ink/50 mt-2">{item.caption}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Stories */}
      <section className="bg-parchment">
        <div className="container-x py-16">
          <h2 className="section-heading mb-8">Featured Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {stories.map((s) => (
              <a href="#" key={s.title} className="group block">
                <div className="aspect-[3/2] overflow-hidden mb-4">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <p className="text-xs text-ink/40 mb-1">{s.date}</p>
                <h3 className="font-display text-lg leading-snug">{s.title}</h3>
                <span className="text-sm text-maroon mt-1 inline-block">Read more &rarr;</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
