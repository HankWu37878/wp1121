"use client";

import useFriends from "@/hooks/useFriends";
import useUserInfo from "@/hooks/useUserInfo";
import Friend from "./Friend";
import type { Friendship } from "@/lib/types/db";


export default function Friends() {
    const { friendships } = useFriends();
    const { username } = useUserInfo();
    

    const figureFriend = (friend: Friendship) => {
        if (friend.name1 === username) {
            return (<Friend name2={friend.name2} key={friend.name2} chatroomId={friend.chatroomId} username={username}/>);
        }
        else {
            return (<Friend name2={friend.name1} key={friend.name1} chatroomId={friend.chatroomId} username={username ?? ""}/>);
        }
    }

  


   
    

    return (
        <div className="flex-col space-x-4 mx-8 pb-5 overflow-scroll h-4/5">
        {friendships.map((friend) => figureFriend(friend))}
        </div>
    )

}