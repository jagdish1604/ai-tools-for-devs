import { useState } from "react";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://formspree.io/f/meeqwval", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setEmail("");        // ✅ clear input
      setSuccess(true);    // ✅ show success message
    }
  };

  return (
    <div className="mt-16 bg-indigo-600 rounded-2xl p-8 text-white">
      <h3 className="text-2xl font-bold mb-2">
        Get new AI tools every week
      </h3>

      <p className="text-indigo-100 mb-4 max-w-xl">
        Join developers and founders discovering the best AI tools.
        No spam. Unsubscribe anytime.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 max-w-xl"
      >
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg text-slate-900"
        />

        <button
          type="submit"
          className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg hover:bg-indigo-50"
        >
          Subscribe
        </button>
      </form>

      {/* ✅ Privacy text */}
      <p className="text-xs text-indigo-100 mt-2">
        We respect your privacy. No spam.
      </p>

      {/* ✅ Success message */}
      {success && (
        <p className="text-sm text-green-200 mt-3">
          ✅ Thanks for subscribing!
        </p>
      )}
    </div>
  );
}
