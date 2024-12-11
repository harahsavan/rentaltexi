"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login, restoreUser } from "@/store/slice/LoginSlice";
import { RootState } from "@/store/store";

type User = {
    email: string;
    password: string;
  };

const Login = () => {
  const isLoggedIn = useSelector((state: RootState) => state.login?.isLoggedIn);

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn) {
            
            router.replace("/deshboard"); 
        }
    }, [isLoggedIn, router]);  

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            dispatch(restoreUser(JSON.parse(storedUser)));
        }
    }, [dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(
            (u: User) =>
                u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
            dispatch(login({ id: user.id, email: user.email, }));
            alert("Login successful!");
            router.push("/deshboard");
        } else {
            alert("Invalid email or password.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
