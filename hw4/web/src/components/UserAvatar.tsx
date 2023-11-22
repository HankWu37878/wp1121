"use client";

import useUserInfo from "@/hooks/useUserInfo";
import { cn } from "@/lib/utils";

type UserAvatarProps = {
  className?: string;
};

export default function UserAvatar({ className }: UserAvatarProps) {
  const { avatarURL } = useUserInfo();
  return (
    <img
      src={avatarURL}
      alt="user avatar"
      width={20}
      height={20}
      className={cn(className, "rounded-full w-1/2")}
    />
  );
}
