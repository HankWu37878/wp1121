import { useState } from "react";

import { useRouter } from "next/navigation";

export default function usePost() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const postActivity = async ({
    username,
    content,
    startDate,
    endDate,
  }: {
    username: string;
    content: string;
    startDate: string;
    endDate: string;
  }) => {
    setLoading(true);

    const res = await fetch("/api/activities", {
      method: "POST",
      body: JSON.stringify({
        username,
        content,
        startDate,
        endDate,
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    const responseJson = await res.json();
    const newActivityId = responseJson.id;
    // router.refresh() is a Next.js function that refreshes the page without
    // reloading the page. This is useful for when we want to update the UI
    // from server components.
    router.refresh();
    setLoading(false);
    return newActivityId;
  };

  const postComment = async ({
    activityId,
    username,
    content,
  }: {
    activityId: number;
    username: string;
    content: string;
  }) => {
    setLoading(true);

    const res = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        activityId,
        username,
        content,
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    // router.refresh() is a Next.js function that refreshes the page without
    // reloading the page. This is useful for when we want to update the UI
    // from server components.
    router.refresh();
    setLoading(false);
  };

  const postAvailable = async ({
    username,
    activityId,
    timeStaterows,
    timeStatecols,
  }: {
    username: string;
    activityId: number;
    timeStaterows: number;
    timeStatecols: number;
  }) => {
    setLoading(true);

    const res = await fetch("/api/timestate", {
      method: "POST",
      body: JSON.stringify({
        username,
        activityId,
        timeStaterows,
        timeStatecols, 
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    // router.refresh() is a Next.js function that refreshes the page without
    // reloading the page. This is useful for when we want to update the UI
    // from server components.
    router.refresh();
    setLoading(false);
  };

  const deleteAvailable = async ({
    username,
    activityId,
    timeStaterows,
    timeStatecols,
  }: {
    username: string;
    activityId: number;
    timeStaterows: number;
    timeStatecols: number;
  }) => {
    setLoading(true);

    const res = await fetch("/api/timestate", {
      method: "Delete",
      body: JSON.stringify({
        username,
        activityId,
        timeStaterows,
        timeStatecols, 
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    // router.refresh() is a Next.js function that refreshes the page without
    // reloading the page. This is useful for when we want to update the UI
    // from server components.
    router.refresh();
    setLoading(false);
  };

  return {
    postActivity,
    postComment,
    postAvailable,
    deleteAvailable,
    loading,
  };
}
