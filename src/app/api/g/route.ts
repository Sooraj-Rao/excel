import Message from "@/actions/send";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Connect to MongoDB (Only if not already connected)
async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(process.env.MONGO_URI!);
}

// Helper function to format timestamps to IST (Indian Standard Time)
function convertToIST(date: Date): string {
  const istOffset = 5.5 * 60; // IST is UTC +5:30
  const localDate = new Date(date.getTime() + istOffset * 60 * 1000); // Convert to IST
  return localDate.toISOString(); // Return in ISO string format
}

// Define the GET handler
export async function GET() {
  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch all messages
    const messages = await Message.find();

    // Transform data to include only required fields and format `createdAt` to IST
    const formattedMessages = messages.map((message) => ({
      id: message._id.toString(),
      email: message.email,
      message: message.message,
      sent_At: convertToIST(message.createdAt), // Format `createdAt` to IST
    }));

    // Send the formatted messages as a response
    return NextResponse.json(formattedMessages);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch messages" });
  }
}
