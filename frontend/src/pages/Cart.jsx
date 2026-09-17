import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { placeOrder } from "../api/client";

function formatPKR(n) {
  return `Rs.${Number(n).toLocaleString("en-PK")}`;
}

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  const shipping = subtotal >= 2000 || subtotal === 0 ? 0 : 250;
  const total = subtotal + shipping;

  async function checkout() {
    if (!user) {
      navigate("/login");
      return;
    }
    setPlacing(true);
    setError("");
    try {
      await placeOrder(
        token,
        {
          shipping_name: user.name,
          shipping_address: "Add your address in Account settings",
          shipping_city: "Karachi",
          shipping_phone: "0300-0000000",
          payment_method: "cod",
        },
        items
      );
      clearCart();
      navigate("/account");
    } catch (e) {
      setError(e.message);
    } finally {
      setPlacing(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="section-heading">Your cart is empty</h1>
        <p className="text-ink/50 mt-2">Find something you'll want to wear on repeat.</p>
        <Link to="/women" className="btn-dark mt-6 inline-flex">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container-x py-10 md:py-14">
      <h1 className="section-heading mb-8">Your Cart</h1>
      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 divide-y divide-line">
          {items.map((item) => (
            <div key={item.key} className="flex gap-4 py-5">
              <div className="w-20 h-24 bg-parchment shrink-0 overflow-hidden">
                <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="text-sm">{item.product.name}</h3>
                  <button onClick={() => removeItem(item.key)} className="text-xs text-ink/40 hover:text-maroon">Remove</button>
                </div>
                <p className="text-xs text-ink/50 mt-1">
                  {item.size && `Size: ${item.size}`} {item.color && `· ${item.color}`}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-line">
                    <button onClick={() => updateQuantity(item.key, item.quantity - 1)} className="w-7 h-7 text-sm">-</button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.key, item.quantity + 1)} className="w-7 h-7 text-sm">+</button>
                  </div>
                  <span className="text-sm">{formatPKR(item.product.price * item.quantity)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-parchment p-6 h-fit">
          <h2 className="font-display text-xl mb-4">Order Summary</h2>
          <div className="flex justify-between text-sm py-1.5">
            <span className="text-ink/60">Subtotal</span>
            <span>{formatPKR(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm py-1.5">
            <span className="text-ink/60">Shipping</span>
            <span>{shipping === 0 ? "Free" : formatPKR(shipping)}</span>
          </div>
          <div className="flex justify-between text-base font-medium py-3 border-t border-line mt-2">
            <span>Total</span>
            <span>{formatPKR(total)}</span>
          </div>
          {error && <p className="text-xs text-maroon mt-2">{error}</p>}
          <button onClick={checkout} disabled={placing} className="btn-dark w-full mt-4 disabled:opacity-60">
            {placing ? "Placing Order..." : "Checkout"}
          </button>
          {!user && <p className="text-xs text-ink/50 mt-3">You'll be asked to log in before checkout.</p>}
        </div>
      </div>
    </div>
  );
}
