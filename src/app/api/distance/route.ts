// pages/api/getCityDistance.ts

import { NextResponse } from "next/server";
import data from "@/utility/in.json";

// Haversine formula to calculate distance between two latitude/longitude points
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
}

export async function POST(req: Request) {
  try {
    const { cityFrom, cityTo } = await req.json();

    const cityData = data;

    // Find the data for the two cities
    const city1Data = cityData.find((city: { city: string }) => city.city === cityFrom);
    const city2Data = cityData.find((city: { city: string }) => city.city === cityTo);

    if (!city1Data || !city2Data) {
      return NextResponse.json(
        { error: "One or both cities not found in the data" },
        { status: 400 }
      );
    }

    // Extract latitude and longitude from city data
    const lat1 = parseFloat(city1Data.lat);
    const lon1 = parseFloat(city1Data.lng);
    const lat2 = parseFloat(city2Data.lat);
    const lon2 = parseFloat(city2Data.lng);

    // Calculate the distance between the two cities
    const distance = calculateDistance(lat1, lon1, lat2, lon2);
    console.log(distance, "distance");
    

    return NextResponse.json({ distance });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while calculating the distance" },
      { status: 500 }
    );
  }
}
