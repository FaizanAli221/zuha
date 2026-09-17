import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  return (
    <Link to={`/women?category=${category.slug}`} className="group block">
      <div className="aspect-square overflow-hidden bg-parchment">
        <img
          src={category.image_url}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex items-center justify-between mt-3">
        <span className="text-sm">{category.name}</span>
        <span className="text-sm group-hover:translate-x-0.5 transition-transform">&rarr;</span>
      </div>
    </Link>
  );
}
