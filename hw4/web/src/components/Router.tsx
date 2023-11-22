"use client";

import useFriends from "@/hooks/useFriends";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


export default function Router() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { friendships } = useFriends();

    const chatroomID = friendships[0]?.chatroomId;

    if (chatroomID) {
        router.push(`${pathname}/chatroom/${chatroomID}?${searchParams.toString()}`);
    }
    return(<></>)
}