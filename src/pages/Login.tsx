import { useState } from "react";
import { api } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/auth/login", { username, password });
      const { token } = response.data;

      localStorage.setItem("token", token);

      navigate("/admin");
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-rose-50 flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
        >
          <h1 className="text-xl md:text-2xl font-semibold text-indigo-950 mt-4 mb-8">
            Login to Your Account
          </h1>
          <div className="mb-4">
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-800"
              required
            />
          </div>

          <div className="mb-6 relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-800 pr-10"
              required
            />
            <div
              className="absolute inset-y-0 top-2 right-4 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash size={21} className="text-indigo-950" />
              ) : (
                <FaEye size={21} className="text-indigo-950" />
              )}
            </div>
          </div>

          {error && (
            <div className="mb-4 text-indigo-800 font-semibold">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-4 text-white bg-indigo-950 rounded-md ${
              loading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
