"use client";

import { signOut, useSession } from "next-auth/react";
import { publicEnv } from "@/lib/env/public";
import { useRouter } from "next/navigation";


export default function SignOutButton() {
  const router = useRouter();
  const { data: session } = useSession();
  const handleSignOut = async() => {
    if (session) {
      await signOut({ callbackUrl: publicEnv.NEXT_PUBLIC_BASE_URL });
    }
    router.push("/");
  }
  return <button className="bg-white px-4 rounded-md border-2 hover:bg-slate-200 hover:shadow-2xl" onClick={handleSignOut}>Sign Out</button>;
}
