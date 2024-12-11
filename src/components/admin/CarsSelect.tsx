'use client'
import React, { useEffect, useState } from 'react'

type City = {
    city: string;
    lat: string;
    lng: string;
    country: string;
    iso2: string;
    admin_name: string;
    capital: string;
    population: string;
    population_proper: string;
};

type Booking = {
    cityFrom: string;
    cityTo: string;
    selectedCar: string;
    price: string;
    distance: number;
};

const CarsSelect = () => {
    const [cityFrom, setCityFrom] = useState("");
    const [cityTo, setCityTo] = useState("");
    const [cities, setCities] = useState<City[]>([]);
    const [selectedCar, setSelectedCar] = useState("");
    const [price, setPrice] = useState("");
    const [Distance, setDistance] = useState<null>(null);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch("/api/cites");
                const data = await response.json();
                setCities(data);
            } catch (error) {
                console.log("Failed to load city data",error);
            }
        };
        fetchCities();
    }, []);

    useEffect(() => {
        const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
        setBookings(storedBookings);
    }, []);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!cityFrom || !cityTo || !selectedCar || !price) {
            alert("Please fill out all fields!");
            return;
        }

        try {
            // Prepare the data for the distance API
            const dataToSend = {
                cityFrom,
                cityTo,
            };

            // Fetch distance from the `/api/distance` endpoint
            const distanceResponse = await fetch("/api/distance", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });

            if (distanceResponse.ok) {
                const result = await distanceResponse.json();
                const calculatedDistance = result.distance;

                // Update distance state
                setDistance(calculatedDistance);

                const newBooking = {
                    cityFrom,
                    cityTo,
                    selectedCar,
                    price,
                    distance: calculatedDistance,
                };

                if (editingIndex !== null) {
                    // Update existing record if editing
                    const updatedBookings = [...bookings];
                    updatedBookings[editingIndex] = newBooking;
                    setBookings(updatedBookings);
                    setEditingIndex(null);
                } else {
                    // Add a new booking
                    setBookings([...bookings, newBooking]);
                }

                // Update local storage
                const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
                storedBookings.push(newBooking);
                localStorage.setItem("bookings", JSON.stringify(storedBookings));

                // Send the booking to the server
                const bookingResponse = await fetch("/api/bookings", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newBooking),
                });

                if (!bookingResponse.ok) {
                    alert("Failed to save booking on the server.");
                }

                // Clear form fields
                setCityFrom("");
                setCityTo("");
                setSelectedCar("");
                setPrice("");
                setDistance(null);

                alert("Booking added successfully!");
            } else {
                alert("Failed to fetch distance. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while fetching distance or saving the booking.");
        }
    };


    const handleEdit = (index: number) => {
        const booking = bookings[index];
        setCityFrom(booking.cityFrom);
        setCityTo(booking.cityTo);
        setSelectedCar(booking.selectedCar);
        setPrice(booking.price);
        setDistance(Distance);
        setEditingIndex(index);
    };

    const handleDelete = (index: number) => {
        // Remove the selected booking from the state
        const updatedBookings = bookings.filter((_, i) => i !== index);
        setBookings(updatedBookings);

        // Update the localStorage with the new bookings array
        localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    };

    return (
        <>
            <div className="max-w-6xl mx-auto mt-10">
                <h1 className="text-xl font-bold mb-4">Booking Manager</h1>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                    {/* Car Select Field */}
                    <div className="grid grid-cols-2 gap-4">
                        <select
                            id="carSelect"
                            value={selectedCar}
                            onChange={(e) => setSelectedCar(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Select a car</option>
                            <option value="Sedan">Sedan</option>
                            <option value="SUV">SUV</option>
                            <option value="Hatchback">Hatchback</option>
                            <option value="Luxury">Luxury</option>
                        </select>
                    </div>
                    {/* City From Field */}
                    <div className="grid grid-cols-2 gap-4">
                        <select
                            id="cityFrom"
                            value={cityFrom}
                            onChange={(e) => setCityFrom(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                                <option key={city.city} value={city.city}>
                                    {city.city}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* City To Field */}
                    <div className="grid grid-cols-2 gap-4">
                        <select
                            id="cityTo"
                            value={cityTo}
                            onChange={(e) => setCityTo(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Select a city</option>
                            <option value="">Select City</option>
                            {cities.map((city) => (
                                <option key={city.city} value={city.city}>
                                    {city.city}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Price Input Field */}
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Enter price"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    {/* Submit Button */}
                    <div>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Submit
                        </button>
                    </div>
                </form>

                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">City From</th>
                            <th className="border border-gray-300 px-4 py-2">City To</th>
                            <th className="border border-gray-300 px-4 py-2">Car</th>
                            <th className="border border-gray-300 px-4 py-2">Price</th>
                            <th className="border border-gray-300 px-4 py-2">Distance (km)</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 px-4 py-2">
                                    {booking.cityFrom}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {booking.cityTo}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {booking.selectedCar}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">₹{booking.price}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {booking.distance?.toFixed(0)}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() => handleEdit(index)}
                                        className="mr-2 px-2 py-1 bg-green-700 text-white rounded"
                                    >
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(index)} className="px-2 py-1 bg-red-500 text-white rounded">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default CarsSelect
