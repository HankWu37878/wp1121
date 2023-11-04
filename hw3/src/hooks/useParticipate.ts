import { useState } from "react";

import { useRouter } from "next/navigation";

export default function useParticipate() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const joinActivity = async ({
    activityId,
    username,
  }: {
    activityId: number;
    username: string;
  }) => {
    if (loading) return;
    setLoading(true);

    const res = await fetch("/api/participants", {
      method: "POST",
      body: JSON.stringify({
        activityId,
        username,
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    router.refresh();
    setLoading(false);
  };

  const leaveActivity = async ({
    activityId,
    username,
  }: {
    activityId: number;
    username: string;
  }) => {
    if (loading) return;

    setLoading(true);
    const res = await fetch("/api/participants", {
      method: "DELETE",
      body: JSON.stringify({
        activityId,
        username,
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    router.refresh();
    setLoading(false);
  };

  return {
    joinActivity,
    leaveActivity,
    loading,
  };
}
