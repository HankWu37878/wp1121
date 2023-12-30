"use client";

import Image from "next/image";
import SignOutButton from "./SignOutButton";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function HeaderBar() {
  const session = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleMainPage = () => {
    const params = new URLSearchParams(searchParams);
    params.set("mode", "buyer"!);
    router.push(`/main/shop?${params.toString()}`);
  }
 


  
  return (
    <div className="flex w-full justify-between rounded-t-xl border-4 border-slate-200 bg-teal-900 px-8 py-8">
      <div className="flex items-end">
          <button
          onClick={handleMainPage}
          className="flex gap-2">
            <Image src="/IMazon.ico" alt="IMazon icon" width={40} height={20} />
            <p className="ml-2 text-4xl font-semibold text-white">IMazon</p>
          </button>
  

        
        <p className="ml-10 tracking-wider text-white">
          Welcome, {session.data?.user?.name}!
        </p>
      </div>
      <div className="flex gap-5">
        <SignOutButton />
      </div>
    </div>
  );
}
