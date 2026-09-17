import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
    setEmail("");
  }

  return (
    <section className="bg-parchment">
      <div className="container-x py-16 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="section-heading">Join the ZUHA list</h2>
          <p className="mt-3 text-ink/60 max-w-md">
            Early access to new collections, first word on restocks, and the
            occasional note on how to style what you already own.
          </p>
        </div>
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="flex-1 bg-ivory border border-line px-4 py-3 text-sm focus:outline-none focus:border-ink"
          />
          <button type="submit" className="btn-dark whitespace-nowrap">
            {sent ? "Subscribed ✓" : "Sign Up"}
          </button>
        </form>
      </div>
    </section>
  );
}
