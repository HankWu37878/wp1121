"use client";

import { Check } from "lucide-react";
import Link from "next/link";

type ActivityProps = {
    activityName: string;
    username: string;
    id: number;
    participants :number;
    participated: boolean;
}

export default function Activity({activityName, id, participants, username, participated}: ActivityProps){
    return (
        <Link className="flex justify-between w-full"
        href={{
            pathname: `/activity/${id}`,
            query: {
              username,
            },
          }}
        >
            <p className="mt-auto mb-auto text-lg">{activityName}</p>

            <div className="flex gap-6 mt-auto mb-auto">
                {participated && <Check/>}
                <p>{participants || 0}人已參加</p>
            </div>
        </Link>
    );
}