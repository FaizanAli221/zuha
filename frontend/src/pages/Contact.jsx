import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function update(field, val) {
    setForm((f) => ({ ...f, [field]: val }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // Simulate sending contact inquiry
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 800);
  }

  return (
    <div className="container-x py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="section-heading text-center mb-3">Contact Us</h1>
        <p className="text-center text-ink/60 text-sm md:text-base max-w-lg mx-auto mb-12 leading-relaxed">
          Have a question about our collections, sizing, orders, or custom styling? We'd love to assist you.
        </p>

        <div className="grid md:grid-cols-2 gap-10 md:gap-14 mb-16">
          {/* Direct Contact Details */}
          <div className="space-y-8 bg-parchment p-8">
            <div>
              <h3 className="font-display text-lg mb-2">Customer Care &amp; WhatsApp</h3>
              <p className="text-sm text-ink/70">Mon – Sat: 10:00 AM – 7:00 PM (PKT)</p>
              <div className="mt-3 space-y-1.5 text-sm">
                <p>
                  <strong className="font-medium">Phone:</strong>{" "}
                  <a href="tel:+924235789000" className="hover:text-maroon transition-colors">+92 42 35789000</a>
                </p>
                <p>
                  <strong className="font-medium">WhatsApp:</strong>{" "}
                  <a
                    href="https://wa.me/923008456789"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-maroon underline underline-offset-4"
                  >
                    +92 300 8456789 (Click to Chat)
                  </a>
                </p>
                <p>
                  <strong className="font-medium">Email:</strong>{" "}
                  <a href="mailto:support@zuha.pk" className="hover:text-maroon transition-colors">support@zuha.pk</a>
                </p>
              </div>
            </div>

            <div className="border-t border-line pt-6">
              <h3 className="font-display text-lg mb-2">Flagship Store (Lahore)</h3>
              <p className="text-sm text-ink/70 leading-relaxed">
                Plot 14-C, MM Alam Road,<br />
                Gulberg III, Lahore, Pakistan
              </p>
            </div>

            <div className="border-t border-line pt-6">
              <h3 className="font-display text-lg mb-2">Karachi Studio</h3>
              <p className="text-sm text-ink/70 leading-relaxed">
                Suite 402, Block 4, Clifton,<br />
                Karachi, Pakistan
              </p>
            </div>
          </div>

          {/* Inquiry Form */}
          <div>
            <h3 className="font-display text-xl mb-4">Send a Message</h3>
            {submitted ? (
              <div className="bg-parchment p-6 border border-gold text-ink text-sm">
                <p className="font-medium text-maroon text-base mb-1">Message Sent!</p>
                <p className="text-ink/70 leading-relaxed">
                  Thank you for reaching out to ZUHA. Our customer service team will get back to you within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-dark mt-4 text-xs"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wide text-ink/60 mb-1">Your Name *</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="e.g. Fatima Ali"
                    className="w-full border border-line px-4 py-2.5 text-sm focus:outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wide text-ink/60 mb-1">Email Address *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="fatima@example.com"
                    className="w-full border border-line px-4 py-2.5 text-sm focus:outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wide text-ink/60 mb-1">Phone / WhatsApp Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="0300 1234567"
                    className="w-full border border-line px-4 py-2.5 text-sm focus:outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wide text-ink/60 mb-1">Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    placeholder="Order inquiry, sizing help, etc."
                    className="w-full border border-line px-4 py-2.5 text-sm focus:outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wide text-ink/60 mb-1">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="How can we help you today?"
                    className="w-full border border-line px-4 py-2.5 text-sm focus:outline-none focus:border-ink"
                  />
                </div>
                <button type="submit" disabled={loading} className="btn-dark w-full disabled:opacity-60">
                  {loading ? "Sending..." : "Submit Inquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
