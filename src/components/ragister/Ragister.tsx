"use client"
import { login } from "@/store/slice/LoginSlice";
import { updateForm } from "@/store/slice/RagisterData";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type Item = {
    id: number; // or string, based on your data structure
    // other properties...
  };


const Register = () => {
    const router = useRouter()
    const [id, setId] = useState<string>();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        postCode: "",
    });

    const dispatch = useDispatch();

    useEffect(() => {
        const storedData = localStorage.getItem("selectedCars");
        if (storedData) {
            const parsedData = JSON.parse(storedData);

            const foundObject = parsedData.find((item: Item) => item.id);

            if (foundObject) {
                setId(foundObject.id);
            }
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const userId = id;

        const userData = { id: userId || "", ...formData };

        dispatch(updateForm(userData));
        dispatch(login(userData))
        // Save to LocalStorage
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
        localStorage.setItem("users", JSON.stringify([...existingUsers, userData]));


        localStorage.setItem("userDataObj", JSON.stringify(userData));

        router.push("/deshboard")
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phoneNumber: "",
            postCode: "",
        })

    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
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
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Phone Number</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Post Code</label>
                    <input
                        type="text"
                        name="postCode"
                        value={formData.postCode}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;

