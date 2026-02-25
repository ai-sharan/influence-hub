import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [role, setRole] = useState("influencer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      setUserName(res.data.user.name);
      setLoggedIn(true);

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loggedIn) {
    return (
      <div style={{ fontFamily: "'Georgia', serif" }} className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-black px-8 py-8">
            <h1 className="text-white text-3xl font-bold tracking-wide">Influence Hub</h1>
            <p className="text-gray-400 text-sm mt-1">Connect. Collaborate. Grow.</p>
          </div>
          <div className="px-8 py-12 text-center">
            <div className="text-5xl mb-6">{role === "influencer" ? "🎯" : role === "business" ? "🏢" : "🛡️"}</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome, {userName}!
            </h2>
            <p className="text-gray-400 text-sm mb-8">
              Logged in as <span className="text-black font-medium">{role}</span>
            </p>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                setLoggedIn(false);
                setEmail("");
                setPassword("");
              }}
              className="bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Georgia', serif" }} className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-black px-8 py-8">
          <h1 className="text-white text-3xl font-bold tracking-wide">Influence Hub</h1>
          <p className="text-gray-400 text-sm mt-1">Connect. Collaborate. Grow.</p>
        </div>
        <div className="px-8 py-8">
          <h2 className="text-gray-800 text-xl font-semibold mb-1">Welcome back</h2>
          <p className="text-gray-400 text-sm mb-6">Sign in to your account</p>

          <div className="flex rounded-lg border border-gray-200 p-1 mb-6 bg-gray-50">
            <button
              onClick={() => setRole("influencer")}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                role === "influencer" ? "bg-black text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Influencer
            </button>
            <button
              onClick={() => setRole("business")}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                role === "business" ? "bg-black text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Business
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-black transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <a href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Forgot password?</a>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200 mt-2 disabled:opacity-50"
            >
              {loading ? "Signing in..." : `Sign In as ${role === "influencer" ? "Influencer" : "Business"}`}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Don't have an account?{" "}
            <a href="#" className="text-black font-medium hover:underline">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
}