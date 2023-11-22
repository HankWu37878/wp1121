import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Message } from "@/lib/types/db";
import { socket } from "./useSocket"

export default function useMessages() {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const router = useRouter();

  useEffect(() => {
    const initSocket = () => {
      socket.on("receive_message", (newMessage: Message) => {
        setMessages((messages) => [...messages, newMessage]);
        socket.emit("scroll", newMessage);
      });
      socket.on("unsend_message", () => {
        fetchMessages();
      });
    };
    const fetchMessages = async() => {
      try {
        const res = await fetch("/api/messages", {
          method: "GET",
          },)
    
        const data = await res.json();
        if (data?.messages) {
          setMessages(data.messages);
          console.log(data.messages);
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    initSocket();
    fetchMessages();
  }, []);

  const sendMessage = async (message : Omit<Message, "createdAt" | "state" | "id">) => {
    if (!socket) {
      alert("No socket! Please retry later.");
      return;
    }

    if (loading)
      return;
    setLoading(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify({
          chatroomId: message.chatroomId,
          authorName: message.authorName, 
          friendName: message.friendName, 
          content: message.content,
        }),
          headers: {
            "Content-Type": "application/json",
          },
      });
      
      const data = await res.json();
      if (data?.message)
      {
        socket.emit("send_message", data.message);
      }
      router.refresh();
      setLoading(false);
    }catch(error){
      console.log(error);
    }
  };

  const unsendMessage = async (message : Pick<Message, "id">, state: string) => {
    if (!socket) {
      alert("No socket! Please retry later.");
      return;
    }
    setLoading(true);
    try {
      await fetch("/api/messages", {
        method: "PUT",
        body: JSON.stringify({
          id: message.id,
          state: state,
        }),
          headers: {
            "Content-Type": "application/json",
          },
      });
      
      
        socket.emit("unsend_message");
  
      router.refresh();
      setLoading(false);
    }catch(error){
      console.log(error);
    }
  };

  return {
    loading,
    messages,
    sendMessage,
    unsendMessage,
  };
}