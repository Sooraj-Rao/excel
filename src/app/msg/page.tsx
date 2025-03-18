"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

interface Message {
  id: string;
  email: string;
  message: string;
  sent_At: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchMessages() {
    try {
      const res = await fetch("/api/g");

      if (!res.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await res.json();
      setMessages(data.reverse() || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]); // In case of error, ensure messages is an empty array
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  // Format date to show exact time in local timezone
  const formatMessageDate = (dateString: string) => {
    return dateString.split("T")[0].split("-").reverse().join("/");
  };

  const formatMessageTime = (dateString: string) => {
    return dateString.split("T")[1].split(".")[0];
  };
  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Messages</h1>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl text-zinc-600 font-bold mb-6">Messages</h1>

      {messages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No messages found</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {messages.reverse().map((message: Message) => (
            <Card
              key={message.id}
              className="overflow-hidden bg-zinc-900 border-zinc-700 text-white shadow-lg rounded-lg "
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="text-sm flex justify-between items-center gap-5 w-full">
                      <a
                        href={`mailto:${message.email}`}
                        className="text-blue-400 hover:text-blue-500 font-semibold"
                      >
                        {message.email}
                      </a>
                      <a
                        href={`mailto:${message.email}`}
                        className="text-zinc-400 hover:text-zinc-300 text-xs"
                      >
                        Reply
                      </a>
                    </div>
                    <CardDescription className="mt-1 text-xs text-zinc-400 flex gap-x-5">
                      <span>{formatMessageDate(message.sent_At)}</span>
                      <span>{formatMessageTime(message.sent_At)}</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-300 line-clamp-3">
                  {message.message}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
