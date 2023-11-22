"use client";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useRef } from "react";
import useUserInfo from "@/hooks/useUserInfo";
import useFriends from "@/hooks/useFriends";




type addActivtyDialogProps = {
    open:boolean;
    onClose: () => void;
};


export default function AddDialogueDialog({open, onClose}: addActivtyDialogProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { username } = useUserInfo();
    const { addFriend } = useFriends();
    const handlePostFriendship = async(e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!username) return;
        const name1 = username;
        const name2 = textareaRef.current?.value;
        if (!name2) return;
        if (name1 === name2) {
            alert("Cant add yourself as a friend.");
            return;
        }

        try {
            await addFriend({
                name1: name1,
                name2: name2,
            });
            textareaRef.current.value = "";
            onClose();
        } catch (e) {
            console.error(e);
            alert("Error adding friend.");
        }
    };

    return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>
            Add a Dialogue with your friend!
        </DialogTitle>
        <DialogContent>
            <div className="flex-col space-y-5 mt-1">
                <textarea className="w-full rounded-md bg-slate-200 overflow-scroll p-2 shadow-sm mb-2" placeholder="User name" rows={1} ref={textareaRef}/>
            </div>
        </DialogContent>
        <DialogActions>
            <button className="border-2 mr-5 p-2 rounded-md m-5 bg-red-100" onClick={onClose}>
                Cancel
            </button>
            <button className="border-2 ml-5 p-2 px-4 rounded-md m-5 bg-lime-100" onClick={handlePostFriendship}>
                Add
            </button>
        </DialogActions>
    </Dialog>
    );
}