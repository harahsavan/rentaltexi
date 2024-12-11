"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/store/slice/AdminSlice";


const AdminLogin: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // useEffect(() => {
  //   if (!isAdmin) {
  //     router.push("/loginadmin");
  //   }
  // }, [isAdmin, router]);

  useEffect(() => {
    // Check if admin is already logged in
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (isLoggedIn) {
      router.push("/admin"); // Redirect to admin page if already logged in
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminCredentials = {
      username: "admin123@gmail.com",
      password: "admin123",
    };

    if (username === adminCredentials.username && password === adminCredentials.password) {
      // Save login state in localStorage
      localStorage.setItem("isAdminLoggedIn", "true");

      // Dispatch login action
      dispatch(login());

      router.push("/admin");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
