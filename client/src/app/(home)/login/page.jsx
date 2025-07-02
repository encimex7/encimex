"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useActionState } from "react";
import { loginAction } from "../../actions/actions";

const initialState = {
  success: false,
  message: null,
};

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [state, formAction] = useActionState(loginAction, initialState);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push("/admin/dashboard");
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Toaster />
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Admin Login
        </h1>
        <form action={formAction} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full p-3 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full p-3 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
            required
          />

          <button
            type="submit"
            disabled={buttonDisabled}
            className={`w-full py-2 rounded-md text-white transition ${
              buttonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
