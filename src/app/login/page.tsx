"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [user, setUser] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [statusButton, setStatusButton] = useState(false);
  const router = useRouter();
  const onLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/login", user);

      toast.success(res.data.message);

      router.push("/profiles");
    } catch (error: unknown) {
  if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("Unknown error occurred");
  }
} finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setStatusButton(true);
    } else setStatusButton(false);
  }, [user]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4 bg-zinc-200">
        <Toaster />
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            {loading ? "processing.." : "Login"}
          </h1>
          <hr className="mb-6 border-gray-300" />

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={onLogin}
              className="bg-orange-400 hover:bg-orange-600 cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              {statusButton ? "Login" : "No Login"}
            </button>
          </div>

          <p className="text-center text-gray-600 text-xs mt-4">
            new user?{" "}
            <Link href="/signup" className="text-blue-500 hover:text-blue-800">
              Sign Up
            </Link>
          </p>
          <p className="text-center text-gray-600 text-xs mt-4">
            forgot password?{" "}
            <Link href="/forgot" className="text-blue-500 hover:text-blue-800">
             click here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
