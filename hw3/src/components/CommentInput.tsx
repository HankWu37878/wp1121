"use client";

import usePost from "@/hooks/usePost";
import useUserInfo from "@/hooks/useUserInfo";
import { useRouter } from "next/navigation";
import { useRef } from "react";

type CommentInputProps = {
    participated: boolean;
    activityId: number;
}

export default function CommentInput({participated, activityId }: CommentInputProps)
{
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();
    const { username } = useUserInfo();
    const { postComment } = usePost();
    const handlePostComment = async(e: React.KeyboardEvent) => {
        if (e.key === "Enter" && e.shiftKey == false)
        {
            const content = textareaRef.current?.value;
            if (!content) return;
            if (!username) return;

            try {
                await postComment({
                    activityId,
                    username,
                    content,
                });
            textareaRef.current.value = "";

            router.refresh();

            } catch (e) {
                console.error(e);
                alert("Error posting activity");
            }
        }
        
    };
    return (
        <>
        {participated ?
        (<textarea id="comment-input" rows={3} placeholder="Leave some comment here..." className="rounded-md bg-slate-200 overflow-scroll p-2 shadow-sm w-full" ref={textareaRef} onKeyDown={handlePostComment}/>):
        (<div className="border-2 p-4 rounded-md bg-amber-50 text-lg tracking-wider">Join to leave some comments here !</div>)}
        </>
    );
}