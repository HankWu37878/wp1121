import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Friendship, Message } from "@/lib/types/db";
import useUserInfo from "./useUserInfo";
import { socket } from "./useSocket"

export default function useFriends() {
  const [loading, setLoading] = useState(false);
  const [friendships, setFriendships] = useState<Friendship[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { username } = useUserInfo();

  
  useEffect(() => {
    const fetchFriendships = async() => {
      try {
        const res = await fetch("/api/friends/Get", {
          method: "POST",
          body: JSON.stringify({
            username: username,
            searchString: searchParams.get("searchString"),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data?.friendships) {
          setFriendships(data.friendships);
          console.log(data.friendships);
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    const initSocket = () => {
      socket.on("receive_invitation", (newFriendship: Friendship) => {
        if (newFriendship.name1 === username || newFriendship.name2 === username)
          setFriendships((friendships) => [newFriendship, ...friendships]);
      });
      socket.on("receive_message", (newMessage: Message) => {
        if (newMessage.authorName === username || newMessage.friendName === username)
          fetchFriendships();
      });
      socket.on("delete_chatroom", () => {
        fetchFriendships();
      });
      socket.on("set_notification",() => {
        router.refresh();
      });
    };
    
    initSocket();
    fetchFriendships();
  }, [searchParams,username,router]);

  const addFriend = async (friendship : Omit<Friendship, "chatroomId">) => {
    if (!socket) {
      alert("No socket! Please retry later.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/friends/Post", {
        method: "POST",
        body: JSON.stringify(friendship),
          headers: {
            "Content-Type": "application/json",
          },
      });
  
      const data = await res.json();
      if (data?.friendship)
      {
        socket.emit("send_invitation", data.friendship);
      }

      if (data?.error)
      {
        alert(data.error);
        return;
      }


      router.refresh();
      setLoading(false);
    }catch(error){
      console.log(error);
    }
  };

  const deleteFriend = async (chatroomId: number) => {
    if (!socket) {
      alert("No socket! Please retry later.");
      return;
    }
    setLoading(true);
    try {
      await fetch("/api/friends/Delete", {
        method: "DELETE",
        body: JSON.stringify(chatroomId),
          headers: {
            "Content-Type": "application/json",
          },
      });

      socket.emit("delete_chatroom");
  
      router.push(`/chat/?${searchParams.toString()}`);
      setLoading(false);
    }catch(error){
      console.log(error);
    }
  };

  const setNotification = async (message : Pick<Message, "chatroomId" | "content">) => {
    if (!socket) {
      alert("No socket! Please retry later.");
      return;
    }
    
    setLoading(true);
    try {
      await fetch("/api/friends/notification", {
        method: "POST",
        body: JSON.stringify(message),
          headers: {
            "Content-Type": "application/json",
          },
      });
  
     
      socket.emit("set_notification");
      


      router.refresh();
      setLoading(false);
    }catch(error){
      console.log(error);
    }
  };

  return {
    loading,
    friendships,
    addFriend,
    deleteFriend,
    setNotification,
  };
}