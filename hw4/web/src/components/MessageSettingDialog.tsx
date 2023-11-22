"use client"

import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, ListItemIcon, ListItemText, MenuItem, Select } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import { useState } from "react";
import type { Message } from "@/lib/types/db";
import useFriends from "@/hooks/useFriends";
import useUserInfo from "@/hooks/useUserInfo";
import useMessages from "@/hooks/useMessages";

type MessageSettingDialogProps = {
    open:boolean;
    onClose: () => void;
    message: Message;
};

export default function MessageSettingDialog( { open, onClose, message }: MessageSettingDialogProps) {
    const [settingType, setSettingType] = useState(1);
    const { setNotification } = useFriends();
    const { unsendMessage } = useMessages();
    const { username } = useUserInfo();
    const handleMessageSetting = async() => {
        if (settingType === 1) {
            try {
                await setNotification({
                    chatroomId: message.chatroomId,
                    content: message.content,
                });
                } catch(error) {
                    console.log(error);
                }
            onClose(); 
            
        }
        else if (settingType === 2) {
            try {
                await unsendMessage({
                    id: message.id,
                    
                }, "me");
                } catch(error) {
                    console.log(error);
                }
            onClose();
        }
        else if (settingType === 3) {
            try {
                await unsendMessage({
                    id: message.id,
                     
                },"everyone");
                } catch(error) {
                    console.log(error);
                }
            onClose();
        }
    }
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                Message setting
            </DialogTitle>
            <DialogContent>
                <Select defaultValue={1}>
                    <MenuItem value={1} onClick={() => setSettingType(1)}>
                        <ListItemIcon>
                            <NotificationsIcon/>
                        </ListItemIcon>
                        <ListItemText>
                            Set message as notification
                        </ListItemText>
                    </MenuItem>
                    {message.authorName === username &&
                    
                        <Divider/>
                    }
                    {message.authorName === username &&
                        <MenuItem value={2} onClick={() => setSettingType(2)}>
                            <ListItemIcon>
                                <PersonIcon/>
                            </ListItemIcon>
                            <ListItemText>
                                Unsend message to me
                            </ListItemText>
                        </MenuItem>
                    }
                    {message.authorName === username &&
                        <MenuItem value={3} onClick={() => setSettingType(3)}>
                            <ListItemIcon>
                                <GroupIcon/>
                            </ListItemIcon>
                            <ListItemText>
                                Unsend message to everyone
                            </ListItemText>
                        </MenuItem> 

                    }
                </Select>
            </DialogContent>
            <DialogActions>
                <button className="border-2 mr-5 p-2 rounded-md m-5 bg-red-100" onClick={onClose}>
                    Cancel
                </button>
                <button className="border-2 ml-5 p-2 px-4 rounded-md m-5 bg-lime-100" onClick={handleMessageSetting}>
                    Sure
                </button>
            </DialogActions>
        </Dialog>
    )
}