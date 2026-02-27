import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import publicApi from "../../../api/publicApi";
import AuthContext from "../../../contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { refreshAuth } = useContext(AuthContext);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const response = await publicApi.login({
        email: normalizedEmail,
        password,
      });

      localStorage.setItem("authToken", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      await refreshAuth();

      const role =
        response.user?.role === "user"
          ? "client"
          : response.user?.role || "client";
      navigate(role === "admin" ? "/admin/" : "/");
    } catch (err) {
      setError(err?.message || "Erreur lors de la connexion");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-peach-light text-brown font-sans">
      <header className="h-20 flex items-center px-4 sm:px-8 lg:px-12">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-12 h-16 flex items-center justify-center"
          aria-label="Go home"
        >
          <img src="/assets/logo2.png" alt="Logo" className="w-12 h-16 object-contain" />
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 pb-10">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch bg-brown/10 rounded-xl p-4 sm:p-6">
          <div className="rounded-xl overflow-hidden shadow-soft hidden sm:block">
            <img
              src="/assets/coffee.svg"
              alt="Coffee beans pack"
              className="w-full h-[260px] sm:h-[360px] lg:h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center py-1">
            <h1 className="font-instrument-serif text-center text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
              Log in
            </h1>

            {error ? (
              <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                {error}
              </div>
            ) : null}

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                className="w-full h-12 border border-brown rounded px-3.5 bg-peach-light outline-none placeholder:text-brown/60 focus:border-brown focus:ring-4 focus:ring-brown/30 text-sm md:text-base"
                placeholder="E-mail"
                value={email}
                type="email"
                onChange={(event) => setEmail(event.target.value)}
                disabled={loading}
              />

              <input
                className="w-full h-12 border border-brown rounded px-3.5 bg-peach-light outline-none placeholder:text-brown/60 focus:border-brown focus:ring-4 focus:ring-brown/30 text-sm md:text-base"
                placeholder="Password"
                value={password}
                type="password"
                onChange={(event) => setPassword(event.target.value)}
                disabled={loading}
              />

              <button
                className="w-full h-12 mt-1 border border-brown rounded bg-brown text-peach-light tracking-wide hover:bg-[#BB9582] hover:text-brown"
                type="submit"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>

              <div>
                <Link to="/forgot-password" className="text-brown hover:underline text-sm">
                  Forgot password?
                </Link>
              </div>

              <div className="flex items-center gap-3 my-3 text-xs sm:text-sm text-brown">
                <span className="h-px bg-brown/25 flex-1" />
                <span>or</span>
                <span className="h-px bg-brown/25 flex-1" />
              </div>

              <div className="text-center text-sm sm:text-base text-brown/80">
                Create Account?{" "}
                <Link to="/register" className="text-brown hover:underline font-medium">
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
