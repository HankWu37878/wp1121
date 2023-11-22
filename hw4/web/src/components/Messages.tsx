"use client";

import useMessages from "@/hooks/useMessages";
import type { Message } from "@/lib/types/db";
import MessageData from "./Message";
import { useRef } from "react";
import { socket } from "@/hooks/useSocket";





type MessagesProps = {
    chatroom_id: number;
};

export default function Messages({ chatroom_id } : MessagesProps) {
    const { messages } = useMessages();
    const bottomdivRef = useRef<HTMLDivElement>(null);
    
    const messagesInChatRoom:Message[] = [];
    messages.forEach((message) => {
        if (message.chatroomId === chatroom_id) {
            messagesInChatRoom.push(message);
        }
    });

    socket.on("scroll", (newMessage: Message) => {
        if (bottomdivRef.current && newMessage.chatroomId === chatroom_id) {
            bottomdivRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }
    });

    
    

   
    

    return (
        <>
            <div className="flex flex-col mx-4 overflow-scroll h-full py-4">
                <div className="space-y-8">
                    {messagesInChatRoom.map((message, i) => 
                    <MessageData message={message} key={i}/>
                    )}
                </div>
                <div ref={bottomdivRef} className="mt-5"></div>
            </div>
        </>
    );
}