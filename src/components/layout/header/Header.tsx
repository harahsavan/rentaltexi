"use client"
import { logout, restoreUser } from "@/store/slice/LoginSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
    const isAuthenticated = useSelector((state: RootState) => state.login?.isLoggedIn);
    const email = useSelector((state: RootState) => state.login?.email);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            dispatch(restoreUser(JSON.parse(storedUser)));
        }
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        alert("You have been logged out.");
        router.push("/login");
    };

    const handleLogin = () => {
        router.push("/login");
    };

    const handleDeshboardButton = () => {
        router.push("/deshboard");
    }


    return (
        <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
            <div className="text-lg font-bold">MyWebsite</div>
            <nav className="flex space-x-4">
                <a href="/ragister" className="hover:underline">Ragister</a>
            </nav>
            <nav className="flex space-x-4">
                <a href="/blog-details" className="hover:underline">Blog</a>
            </nav>
            {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                    <span>Welcome, {email}</span>
                    <button
                        onClick={handleLogout}
                        className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <button
                    onClick={handleLogin}
                    className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition"
                >
                    Login
                </button>
            )}
            {isAuthenticated && (
                <button
                onClick={handleDeshboardButton}
                className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition"
            >
                Deshboard
            </button>
            )}
             
        </header>
    );
};

export default Header;

