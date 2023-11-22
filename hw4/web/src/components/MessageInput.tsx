"use client";

import useMessages from "@/hooks/useMessages";
import useUserInfo from "@/hooks/useUserInfo";
import { useRouter } from "next/navigation";
import { useRef } from "react";

type MessageInputProps = {
    chatroomId: number;
    friendName: string;
}   

export default function MessageInput( { chatroomId, friendName }: MessageInputProps ) {
    const textareaRef = useRef<HTMLInputElement>(null);
    const { username } = useUserInfo();
    const { sendMessage } = useMessages();
    const router = useRouter();
    const handleSendMessage = async(e: React.KeyboardEvent) => {
        if (e.key === "Enter" && e.shiftKey == false)
        {
            e.preventDefault();
            const content = textareaRef.current?.value;
            
            if (!content) return;
            if (!username) return;
            const authorName = username;
            
            try {
                await sendMessage({
                    chatroomId: chatroomId,
                    authorName: authorName,
                    friendName: friendName,
                    content: content,
                });
            textareaRef.current.value = "";

            router.refresh();

            } catch (e) {
                console.error(e);
                alert("Error sending message.");
            }
        }
    };
    return (
        <>
            <input id="comment-input" type="text" placeholder="Leave some messages here..." className="rounded-md bg-gray-200 overflow-scroll p-2 shadow-sm w-full" ref={textareaRef} onKeyDown={handleSendMessage}/>
        </>
    );
}