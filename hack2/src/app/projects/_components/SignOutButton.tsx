// TODO: 4. Call the signOut() function when the button is clicked
"use client";

// hint: You may want to change the first line of this file
import { signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
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
  return <Button variant={"outline"} onClick={handleSignOut} id="sign-out-button">Sign Out</Button>;
}
// TODO: 4. end
