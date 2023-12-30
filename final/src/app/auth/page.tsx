import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

import AuthForm from "./_components/AuthForm";
import Image from "next/image";

export default async function AuthPage() {
  // If signed in, redirect to /
  const session = await auth();

  if (session?.user?.id) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-5 bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn00n6gE9TEOM5sKOa-mCwPR8uP4oRJ44VY1zW1Tb92QyHS93u9OCwiwvnJNY_I4rZMM8&usqp=CAU)]">
      <div className="font-semibold bg-white min-w-[400px] py-5 rounded-xl border-2 border-black flex justify-center gap-4 items-center">
        <Image src="/IMazon.ico" alt="IMazon icon" width={40} height={20}/>
        Welcome to IMazon!
        <Image src="/IMazon.ico" alt="IMazon icon" width={40} height={20}/>
      </div>
      <AuthForm />
    </main>
  );
}
