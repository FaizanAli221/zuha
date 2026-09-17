import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "login") {
        await login(form.email, form.password);
      } else {
        await register(form.name, form.email, form.password, form.phone);
      }
      navigate("/account");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-x py-16 md:py-24 max-w-md mx-auto">
      <h1 className="section-heading mb-1">{mode === "login" ? "Welcome back" : "Create an account"}</h1>
      <p className="text-ink/50 text-sm mb-8">
        {mode === "login" ? "Log in to view your orders and wishlist." : "Join ZUHA for faster checkout and order tracking."}
      </p>

      <form onSubmit={submit} className="space-y-4">
        {mode === "register" && (
          <input
            required
            placeholder="Full name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full border border-line px-4 py-3 text-sm focus:outline-none focus:border-ink"
          />
        )}
        <input
          required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className="w-full border border-line px-4 py-3 text-sm focus:outline-none focus:border-ink"
        />
        {mode === "register" && (
          <input
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="w-full border border-line px-4 py-3 text-sm focus:outline-none focus:border-ink"
          />
        )}
        <input
          required
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => update("password", e.target.value)}
          className="w-full border border-line px-4 py-3 text-sm focus:outline-none focus:border-ink"
        />

        {error && <p className="text-xs text-maroon">{error}</p>}

        <button type="submit" disabled={loading} className="btn-dark w-full disabled:opacity-60">
          {loading ? "Please wait..." : mode === "login" ? "Log In" : "Create Account"}
        </button>
      </form>

      <button
        onClick={() => setMode(mode === "login" ? "register" : "login")}
        className="text-sm text-maroon underline underline-offset-4 mt-6 block mx-auto"
      >
        {mode === "login" ? "New here? Create an account" : "Already have an account? Log in"}
      </button>
    </div>
  );
}
