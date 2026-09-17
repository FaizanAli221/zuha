import { Link } from "react-router-dom";

export default function CollectionCircle({ collection }) {
  return (
    <Link to={`/collections?c=${collection.slug}`} className="flex flex-col items-center gap-3 shrink-0 w-28 md:w-36 group">
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-1 ring-line">
        <img
          src={collection.image_url}
          alt={collection.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <span className="text-xs tracking-wide text-center uppercase">{collection.name}</span>
    </Link>
  );
}
