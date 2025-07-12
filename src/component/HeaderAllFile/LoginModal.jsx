"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { signIn } from "next-auth/react";

export default function LoginModal({ isOpen, onClose }) {
  const [isClosing, setIsClosing] = useState(false);
  const [authType, setAuthType] = useState("login"); // 'login' or 'register'

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
      setError(""); // Close হওয়ার সময় error clear করুন
    }, 300); // Animation duration
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("provider your login Information");
      return;
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        role: "user",
        redirect: false,
      });

      if (res.status == 200) {
        window.location.href = "/";
      }
      if (res.err) {
        setError("Invalid Credentials");
      }
    } catch (err) {
      console.log("login fail", err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All field are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("user already exists");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          role: "admin",
          password,
        }),
      });
      if (res.ok) {
        const from = e.target;
        from.reset();
        setError(" User registered successfully");
        setAuthType("login");
      } else {
        console.log("User register failed");
      }
    } catch (err) {
      console.log("Error during registration", err);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-white/40 backdrop-blur-sm z-50"
        onClick={handleClose}
      ></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className={`bg-white w-full sm:rounded-lg sm:max-w-md relative p-8 shadow-xl ${
            isClosing ? "animate-fadeOutScale" : "animate-fadeInScale"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 p-1 cursor-pointer hover:border rounded-full"
          >
            <X size={24} />
          </button>

          <div className="flex border-b mb-6">
            <button
              onClick={() => setAuthType("login")}
              className={`flex-1 py-2 font-semibold ${
                authType === "login"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setAuthType("register")}
              className={`flex-1 py-2 font-semibold ${
                authType === "register"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              Register
            </button>
          </div>

          {authType === "login" ? (
            <form onSubmit={handleLogin}>
              <h2 className="text-2xl font-bold text-center mb-4">
                Welcome Back!
              </h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm text-center mb-4">{error}</p>
              )}
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 disabled:bg-gray-400 flex items-center justify-center"
              >
                Login
              </button>
              <p className="text-center mt-4 text-sm">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setAuthType("register");
                    setError("");
                  }}
                  className="text-blue-600 hover:underline"
                >
                  Sign Up
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <h2 className="text-2xl font-bold text-center mb-4">
                Create an Account
              </h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm text-center mb-4">{error}</p>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 disabled:bg-gray-400 flex items-center justify-center"
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white mr-3"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Create Account & Login"
                )}
              </button>
              <p className="text-center mt-4 text-sm">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setAuthType("login");
                    setError(""); // ট্যাব পরিবর্তন করলে এরর ক্লিয়ার করুন
                  }}
                  className="text-blue-600 hover:underline"
                >
                  Login
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
