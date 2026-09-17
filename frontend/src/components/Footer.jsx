import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-ink text-ivory mt-20">
      <div className="container-x py-14 grid grid-cols-2 md:grid-cols-4 gap-10 text-sm">
        <div className="col-span-2 md:col-span-1">
          <div className="font-display text-2xl mb-4">ZUHA<span className="text-gold">.</span></div>
          <p className="text-ivory/60 leading-relaxed">
            ZUHA is a Pakistani-born label for those who like their tradition
            worn on contemporary terms -- easy silhouettes, original prints,
            and fabric that moves.
          </p>
        </div>

        <div>
          <h4 className="tracking-wide text-ivory/50 mb-4">About</h4>
          <ul className="space-y-2.5 text-ivory/80">
            <li><Link to="/contact" className="hover:text-gold">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Design Philosophy</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Store Locator</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Careers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="tracking-wide text-ivory/50 mb-4">Customer Care</h4>
          <ul className="space-y-2.5 text-ivory/80">
            <li><Link to="/contact" className="hover:text-gold">FAQs</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Returns &amp; Exchanges</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Shipping Policy</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="tracking-wide text-ivory/50 mb-4">Shop</h4>
          <ul className="space-y-2.5 text-ivory/80">
            <li><Link to="/women" className="hover:text-gold">Women</Link></li>
            <li><Link to="/men" className="hover:text-gold">Men</Link></li>
            <li><Link to="/new-arrivals" className="hover:text-gold">New Arrivals</Link></li>
            <li><Link to="/best-sellers" className="hover:text-gold">Best Sellers</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-x py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-ivory/50">
          <p>&copy; {new Date().getFullYear()} ZUHA. All rights reserved. A fictional brand built for demonstration.</p>
          <p>Privacy Policy &middot; Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
