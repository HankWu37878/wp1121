"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import SearchIcon from '@mui/icons-material/Search';
import { useRef } from "react";
import useFriends from "@/hooks/useFriends";



export default function SearchUser() {
    const textareaRef = useRef<HTMLInputElement>(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const { friendships } = useFriends();
    


    const handleSearch = async() => {
        const searchString = textareaRef.current?.value;
        const params = new URLSearchParams(searchParams);
        params.set("searchString", searchString!);
        router.push(`${pathname}?${params.toString()}`);
    }
    return (
        <>
            <div className="flex space-x-2">
                <input type="text" placeholder="Search User" className="rounded-2xl bg-gray-200 w-full align-middle p-2" ref={textareaRef}/>
                <button onClick={handleSearch}>
                    <SearchIcon className="hover:text-3xl"/>
                </button>
            </div>
            
            {friendships.length === 0 && <p className="text-center mt-20 text-gray-500">是否新增聊天室？</p>}
        </>
    );
}