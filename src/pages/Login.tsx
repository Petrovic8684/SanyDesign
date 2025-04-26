import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: any) => {
    e.preventDefault();
    console.log("Logged in with", username, password);
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

          <div className="mb-6">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-800"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 text-white bg-indigo-950 rounded-md"
          >
            Login
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
