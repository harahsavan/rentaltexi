"use client"
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import OrderCard from "../ordercard/OrderCard";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

interface Order {
    name: string;
    email: string;
    phoneNumber: string;
    discountedPrice: string;
    finalPayableAmount: string;
    pickUpDate: string;
    pickUpTime: string;
    city: string;
    returnDate: string;
    price: string;
    selectedCar: string;
    from: string;
    to: string;
    distance: string;
}

interface UserInfo {
    name: string;
    email: string;
    phoneNumber: string;
    pickUp: string;
    drop: string;
}

interface Blog {
    title: string;
    image: string;
    date: string;
    description: string;
}

const Dashboard = () => {
    const isLoggedIn = useSelector((state: RootState) => state.login?.isLoggedIn);
    const router = useRouter()
    const [selectedOption, setSelectedOption] = useState("Booking");
    const [selectedOrderOption, setSelectedOrderOption] = useState<'today' | 'futere' | 'past'>("today");
    const [formData, setFormData] = useState({ email: "" });
    const [userInfoData, setUserInfoData] = useState<UserInfo | null>(null);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [currentOrders, setCurrentOrders] = useState<Order[]>([]);
    const [upcomingOrders, setUpcomingOrders] = useState<Order[]>([]);
    const [pastOrders, setPastOrders] = useState<Order[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/login");
        }
    }, [isLoggedIn, router]);

    useEffect(() => {
        const storedBlogs = localStorage.getItem("blogs");
        if (storedBlogs) {
            const parsedBlogs = JSON.parse(storedBlogs);
            setBlogs(parsedBlogs);
            setFilteredBlogs(parsedBlogs);
        }
    }, []);

    useEffect(() => {
        const storedData = localStorage.getItem('user');
        if (storedData) {
            setFormData(JSON.parse(storedData));
        }
    }, []);

    useEffect(() => {
        const storedData = localStorage.getItem('userInfoObj');
        if (storedData) {
            setUserInfoData(JSON.parse(storedData));
        }
    }, []);

    useEffect(() => {
        // Retrieve stored data from localStorage
        const storedData: string | null = localStorage.getItem("orderHistory");
        const storedUserEmail: string | null = localStorage.getItem("user");

        if (storedUserEmail && storedData) {
            try {
                const parsedUserEmail = JSON.parse(storedUserEmail) as { email: string };
                const targetEmail = parsedUserEmail.email;

                const parsedData = JSON.parse(storedData) as Order[];

                const userOrders = parsedData.filter((item) => item.email === targetEmail);

                const today = new Date().toISOString().split('T')[0];

                const current = userOrders.filter(
                    (order) => order.pickUpDate === today
                );
                const upcoming = userOrders.filter(
                    (order) => new Date(order.pickUpDate) > new Date(today)
                );
                const past = userOrders.filter(
                    (order) => new Date(order.pickUpDate) < new Date(today)
                );

                setCurrentOrders(current);
                setUpcomingOrders(upcoming);
                setPastOrders(past);
            } catch (error) {
                console.error('Error parsing data:', error);
            }
        }
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter blogs by title
        const filtered = blogs.filter((blog) =>
            blog.title.toLowerCase().includes(query)
        );
        setFilteredBlogs(filtered);
    };

    const handleHomeButton = () => {
        router.push("/")
    }

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-1/6 bg-blue-500 text-white p-4">
                <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
                <nav className="space-y-4">
                    <button onClick={() => setSelectedOption("Booking")} className="w-full py-2 px-4 bg-white text-blue-500 rounded hover:bg-blue-600 hover:text-white transition">
                        Booking
                    </button>
                    <button onClick={() => setSelectedOption("User")} className="w-full py-2 px-4 bg-white text-blue-500 rounded hover:bg-blue-600 hover:text-white transition">
                        User Info
                    </button>
                    <button onClick={() => setSelectedOption("Button")} className="w-full py-2 px-4 bg-white text-blue-500 rounded hover:bg-blue-600 hover:text-white transition">
                        Blog List
                    </button>
                    <button onClick={handleHomeButton} className="w-full py-2 px-4 bg-white text-blue-500 rounded hover:bg-blue-600 hover:text-white transition">
                        Home
                    </button>
                </nav>
            </aside>
            {/* Main Content */}
            {selectedOption === "Booking" && (
                <main className="flex-1 p-6 bg-gray-100">
                    <div className="flex justify-center mt-10">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <a
                                onClick={() => setSelectedOrderOption("today")}
                                className="bg-white shadow-lg rounded-lg p-6 text-center hover:scale-105 transform transition-all duration-300"
                            >
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Current
                                </h2>
                            </a>
                            <a
                                onClick={() => setSelectedOrderOption("futere")}
                                className="bg-white shadow-lg rounded-lg p-6 text-center hover:scale-105 transform transition-all duration-300"
                            >
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Upcoming
                                </h2>
                            </a>
                            <a
                                onClick={() => setSelectedOrderOption("past")}
                                className="bg-white shadow-lg rounded-lg p-6 text-center hover:scale-105 transform transition-all duration-300"
                            >
                                <h2 className="text-xl font-semibold text-gray-800">
                                    History
                                </h2>
                            </a>
                        </div>
                    </div>

                    {selectedOrderOption === "today" && (
                        <section>
                            <h2 className="text-2xl font-bold mb-2">Current Orders</h2>
                            {currentOrders.length ? (
                                currentOrders.map((data, index: number) => (
                                    <OrderCard key={index} data={data} index={index} />
                                ))
                            ) : (
                                <p>No current orders found.</p>
                            )}
                        </section>
                    )}

                    {selectedOrderOption === "futere" && (
                        <section>
                            <h2 className="text-2xl font-bold mb-2">Upcoming Orders</h2>
                            {upcomingOrders.length ? (
                                upcomingOrders.map((data, index: number) => (
                                    <OrderCard key={index} data={data} index={index} />
                                ))
                            ) : (
                                <p>No upcoming orders found.</p>
                            )}
                        </section>
                    )}

                    {selectedOrderOption === "past" && (
                        <section>
                            <h2 className="text-2xl font-bold mb-2">History</h2>
                            {pastOrders.length ? (
                                pastOrders.map((data, index: number) => (
                                    <OrderCard key={index} data={data} index={index} />
                                ))
                            ) : (
                                <p>No past orders found.</p>
                            )}
                        </section>
                    )}
                </main>
            )}
            {selectedOption === "User" && (
                <main className="flex-1 p-6 bg-gray-100">
                    <h1 className="text-3xl font-bold mb-4">User Details</h1>

                    <p className="text-gray-700">
                        <span>Name :</span> {userInfoData?.name}
                    </p>

                    <p className="text-gray-700">
                        <span>Email :</span> {formData?.email}
                    </p>

                    <p className="text-gray-700">
                        <span>PhoneNumber :</span> {userInfoData?.phoneNumber}
                    </p>
                    <p className="text-gray-700">
                        <span>PickUp :</span> {userInfoData?.pickUp}
                    </p>
                    <p className="text-gray-700">
                        <span>Drop :</span> {userInfoData?.drop}
                    </p>
                </main>
            )}
            {selectedOption === "Button" && (
                <main className="flex-1 p-6 bg-gray-100">
                    <div className="max-w-3xl mx-auto mt-10">
                        <h1>Blog Search</h1>
                        {/* Search Input Field */}
                        <input
                            type="text"
                            placeholder="Search blog titles..."
                            value={searchQuery}
                            onChange={handleSearch}
                            style={{
                                padding: "10px",
                                marginBottom: "20px",
                                width: "100%",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                            }}
                        />
                        <h2 className="text-xl font-semibold mb-4">Blog List</h2>
                        {filteredBlogs.length === 0 ? (
                            <p className="text-gray-500">No blogs added yet.</p>
                        ) : (
                            filteredBlogs.map((blog, index) => (
                                <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
                                    <h3 className="text-lg font-bold">{blog.title}</h3>
                                    <Image
                                        src={blog.image}
                                        alt={blog.title}
                                        width={0}
                                        height={0}
                                        className="w-full h-40 object-cover rounded-md mt-2"
                                    />
                                    <p className="text-gray-500 text-sm mt-1">{blog.date}</p>
                                    <p className="mt-2">{blog.description}</p>
                                </div>
                            ))
                        )}
                    </div>
                </main>
            )}
        </div>
    );
};

export default Dashboard;

