// app/api/bookings/route.ts
import { NextResponse } from "next/server";

interface Booking {
  id: string;
  name: string;
  date: string;
  // Add other fields based on your booking data structure
}

const bookings: Booking[] = []; // Temporary in-memory storage

export async function GET() {
  return NextResponse.json(bookings);
}

export async function POST(request: Request) {
  try {
    const newBooking: Booking = await request.json(); // Assuming the request body matches the Booking interface
    bookings.push(newBooking); // Add new booking to the storage
    return NextResponse.json({ message: "Booking added successfully", bookings });
  } catch (error) {
    // Use `unknown` type for errors and narrow it down
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Failed to add booking", error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "An unknown error occurred" },
      { status: 400 }
    );
  }
}
