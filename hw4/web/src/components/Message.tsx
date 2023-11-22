"use client";

import useUserInfo from "@/hooks/useUserInfo";
import type { Message } from "@/lib/types/db";
import { getAvatar } from "@/lib/utils";
import { useState } from "react";
import MessageSettingDialog from "./MessageSettingDialog";
import Linkify from "react-linkify";


type MessageProps = {
    message: Message;
}

export default function MessageData( { message }: MessageProps) {
    const { username } = useUserInfo();
    const [messageSettingDialogOpen, setmessageSettingDialogOpen] = useState(false);


    return (
        <>
            {message.authorName === username? 
                (
                    <div className="flex justify-end">
                        {!message.state ? 
                        (<button onContextMenu={(e) => {e.preventDefault(); setmessageSettingDialogOpen(true);}}>
                            <div className="rounded-lg p-2 max-w-xs bg-sky-100 text-left">
                                <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                                            <a
                                            href={decoratedHref}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-800 underline"
                                            key={key}
                                            >
                                            {decoratedText}
                                            </a>
                                    )}
                                    >
                                    {message.content}
                                </Linkify>
                            </div>
                        </button>) : 
                        (
                            <div className="rounded-lg p-2 max-w-xs bg-sky-100 text-left">
                                <p className="italic font-light text-gray-500">This message has been unsent by {message.authorName}.</p>
                            </div>
                        )}

                        
                    </div>
                ):
                (
                    <div className="flex justify-start">
                        <img
                        src={getAvatar(message.authorName)}
                        alt="user avatar"
                        width={40}
                        height={5}
                        className="rounded-full h-10"
                        />
                        {message.state === "everyone" ? (
                            <div className="bg-violet-100 rounded-lg p-2 ml-4 max-w-xs text-left">
                                <p className="italic font-light text-gray-500">This message has been unsent by {message.authorName}.</p>
                            </div>
                        ):
                        (
                        <button onContextMenu={(e) => {e.preventDefault(); setmessageSettingDialogOpen(true);}}>
                            <div className="bg-violet-100 rounded-lg p-2 ml-4 max-w-xs text-left">
                                <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                                        <a
                                        href={decoratedHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-800 underline"
                                        key={key}
                                        >
                                        {decoratedText}
                                        </a>
                                )}
                                >
                                    {message.content}
                                </Linkify>
                            </div>
                        </button>)}
                    </div>
                )}
            <MessageSettingDialog open={messageSettingDialogOpen} onClose={() => setmessageSettingDialogOpen(false)} message={message}/>
        </>
    )
}