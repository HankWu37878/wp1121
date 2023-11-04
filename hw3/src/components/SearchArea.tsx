"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export default function SearchArea() {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const handleSearch = async() => {
        const searchString = textareaRef.current?.value;
        if (!searchString)
            return;

        const params = new URLSearchParams(searchParams);
        params.set("searchString", searchString!);
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <>
            <textarea rows={3} ref={textareaRef} placeholder="Search for some activities?" className="rounded-md bg-slate-200 overflow-scroll p-2 shadow-sm w-1/2"/>
                <button className="border-2 rounded-md p-2 shadow-sm h-1/2" onClick={handleSearch}>
                    <Search size={20}/>
                </button>
        </>
    );
}