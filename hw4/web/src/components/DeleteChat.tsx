"use client";
import useFriends from '@/hooks/useFriends';
import DeleteIcon from '@mui/icons-material/Delete';

type DeleteChatProps = {
    chatroomId: number;
}


export default function DeleteChat( { chatroomId }: DeleteChatProps) {
    const { deleteFriend } = useFriends();
    const handleDeleteChatroom = async() => {
        await deleteFriend(chatroomId);
    }

    return (
    <>
        <button className="mr-5" onClick={handleDeleteChatroom}>
            <DeleteIcon className="text-2xl  hover:text-red-700"/>
        </button>
    </>);
}