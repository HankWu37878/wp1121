"use client"

import useParticipate from "@/hooks/useParticipate";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ParticipateButtonProps = {
    initialParticipated: boolean;
    activityId: number,
    username: string,
}

export default function ParticipateButton( { initialParticipated, activityId, username }: ParticipateButtonProps)
{
    const [joined, setJoined] = useState(initialParticipated);
    const { loading, joinActivity, leaveActivity } = useParticipate();
    const router = useRouter();
    const handleJoinedChange = async() =>
    {
        if (!username) return;
        if (joined) {
          await leaveActivity({
            activityId,
            username: username,
          });
          setJoined(false);
          router.refresh();
          
        } else {
          await joinActivity({
            activityId,
            username: username,
          });
          setJoined(true);
          router.refresh();
        }
    }
    return (
        <button className={cn("text-1xl border-2 p-2 rounded-md shadow-sm w-32", joined && "bg-amber-50")} onClick={handleJoinedChange} disabled={loading}>
            {joined ? "Already in":"Join!"}
        </button>
    );
}