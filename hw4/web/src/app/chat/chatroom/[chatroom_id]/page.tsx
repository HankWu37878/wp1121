import DeleteChat from "@/components/DeleteChat";
import MessageInput from "@/components/MessageInput";
import Messages from "@/components/Messages";
import { db } from "@/db";
import { friendsTable } from "@/db/schema";
import { getAvatar } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import NotificationsIcon from '@mui/icons-material/Notifications';

type ChatRoomPageProps = {
    params: {
      chatroom_id: string;
    };
    searchParams: {
      username?: string;
    };
  };

export default async function ChatRoomPage({
    params: { chatroom_id },
    searchParams: { username },
  }: ChatRoomPageProps) {

    const chatroom_id_num = parseInt(chatroom_id);
    const errorRedirect = () => {
        const params = new URLSearchParams();
        username && params.set("username", username);
        redirect(`/?${params.toString()}`);
      };
  
    if (isNaN(chatroom_id_num)) {
    errorRedirect();
    }

    const [chatroomData] = await db
    .select({
    id: friendsTable.id,
    name1: friendsTable.userName,
    name2: friendsTable.friendName,
    notification: friendsTable.notification,
    })
    .from(friendsTable)
    .where(eq(friendsTable.id, chatroom_id_num))
    .execute();

    if (!chatroomData)
    errorRedirect();

    
    let friend = chatroomData.name2;
    if (friend === username) {
        friend = chatroomData.name1;
    }


    return ( 
        <div className="flex w-full flex-col justify-between h-screen">
            <div className="h-3/4">
              <div className="flex border-b-2 justify-between">
                  <div className="flex py-4">
                        <img
                        src={getAvatar(friend)}
                        alt="user avatar"
                        width={80}
                        height={30}
                        className="rounded-full p-2"
                        />
                        <p className="ml-2 text-2xl mt-3">{friend}</p>
                  </div>
                  
                  <DeleteChat chatroomId={chatroom_id_num}/>
              </div>
              {chatroomData.notification && 
              <div className="bg-yellow-100 rounded-md m-4 p-2 flex">
                <NotificationsIcon/>
                <p className="ml-2">{chatroomData.notification.length > 40? (chatroomData.notification.substring(0,40) + "..."): (chatroomData.notification)}</p>
              </div>}
              <Messages chatroom_id={chatroom_id_num}/>
            </div>
      
            <div className="mb-5 mx-5">
                <MessageInput chatroomId={chatroomData.id} friendName={friend}/>
            </div>  
        </div>
    );
}