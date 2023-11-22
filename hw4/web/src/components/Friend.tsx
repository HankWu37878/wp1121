"use client";

import useMessages from "@/hooks/useMessages";
import { getAvatar } from "@/lib/utils";
import Link from "next/link";

type Friendprops = {
    name2: string;
    username: string;
    chatroomId: number;
}

export default function Friend({ name2, chatroomId, username }: Friendprops) {
    const { messages } = useMessages();
    let latestMessage = "";
    messages.forEach((message) => {
        if (message.chatroomId === chatroomId) {
            if (message.authorName !== username) {
                latestMessage = message.content;
            }
        }
    });
    return (
        <Link 
        href={{
            pathname: `/chat/chatroom/${chatroomId}`,
            query: {
              username,
            },
          }}
        >
            <div className="bg-white rounded-xl h-20 flex">
                <img
                src={getAvatar(name2)}
                alt="user avatar"
                width={80}
                height={30}
                className="rounded-full p-2"
                />
                <div className="flex-col ml-2">
                    <p className="mt-3 text-2xl">{name2}</p>
                    <p className="text-gray-400 text-sm">{latestMessage.length > 40 ? (latestMessage.substring(0,40) + "..." ):(latestMessage)}</p>
                </div>
                
            </div>
        </Link>
    )
}