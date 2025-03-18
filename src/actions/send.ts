"use server";

import mongoose, { Schema, Document } from "mongoose";

// Define the interface for TypeScript
interface IMessage extends Document {
  email: string;
  message: string;
}

// Define the schema
const MessageSchema = new Schema<IMessage>(
  {
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

// Create or reuse the model
const Message =
  mongoose.models.excel || mongoose.model<IMessage>("excel", MessageSchema);

// Function to save the message
export const SendMail = async (props: any) => {
  try {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGO_URI!);
    }

    const { email, message } = props;
    const newMessage = new Message({ email, message });
    await newMessage.save();

    return { error: false };
  } catch (error) {
    console.error("Error saving message:", error);
    return { error: true };
  }
};

export default Message;
