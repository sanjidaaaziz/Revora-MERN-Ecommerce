import React, { useState } from "react";

const NewsLetterBox = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!email) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/newsletter`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setMessage("Subscribed successfully!");
        setEmail("");
      } else {
        setMessage(data.error || "Subscription failed. Try again.");
      }
    } catch (error) {
      setMessage("Something went wrong. Try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 text-center">
      <p className="text-2xl font-medium text-gray-800">
        Get <span className="text-purple">20%</span> Off Instantly – Just Hit
        Subscribe!
      </p>
      <p className="mt-3 text-gray-400">
        Subscribe today and enjoy exclusive savings!
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="flex items-center w-full gap-3 pl-3 mx-auto my-6 border sm:w-1/2"
      >
        <input
          className="w-full outline-none sm:flex-1"
          type="email"
          placeholder="hello@gmail.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="px-10 py-4 text-xs text-white bg-purple"
          disabled={loading}
        >
          {loading ? "Submitting..." : "SUBSCRIBE"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-2 text-sm ${
            message.includes("success") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default NewsLetterBox;
