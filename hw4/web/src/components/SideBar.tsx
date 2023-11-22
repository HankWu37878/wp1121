"use client";

import Image from "next/image";
import Link from "next/link";
import messenger from "@/assets/messenger.png"
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from "@mui/material";
import UserAvatar from "./UserAvatar";


export default function SideBar() {
    return (
        <aside className="flex flex-col h-screen justify-between px-6 py-6 w-1/5">
            <div className="p-2">
                <Link href="/">
                    <Image src={messenger} alt="Messenger" className="w-1/2"/>
                </Link>
            </div>
            <div className="flex justify-between">
                <UserAvatar/>
                <Link href="/">
                    <IconButton size="large">
                        <LogoutIcon fontSize="large"/>
                    </IconButton>
                </Link>
            </div>
        </aside>
    );
}