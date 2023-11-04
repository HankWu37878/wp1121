"use client";
import { useRouter } from "next/navigation";

export default function ChangeUserButton()
{
    const router = useRouter();
    return (
        <button className="text-1xl border-2 p-2 rounded-md shadow-sm" onClick={() => router.push("/")}>
            Change User
        </button>
    );
}