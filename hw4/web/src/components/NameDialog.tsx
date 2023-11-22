"use client";

import { useEffect, useRef, useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { validateUsername } from "@/lib/utils";
import { Dialog, DialogActions, DialogContent } from "@mui/material";

export default function NameDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const [usernameError, setUsernameError] = useState(false);

  useEffect(() => {
    const username = searchParams.get("username");
    setDialogOpen(!validateUsername(username));
  }, [searchParams]);

  const handleSave = () => {
    const username = usernameInputRef.current?.value;

    const newUsernameError = !validateUsername(username);
    setUsernameError(newUsernameError)

    if (newUsernameError) {
      return false;
    }

    const params = new URLSearchParams(searchParams);
    params.set("username", username!);
    router.push(`/chat/${pathname}?${params.toString()}`);
    setDialogOpen(false);

    return true;
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setDialogOpen(true);
    } else {
      handleSave() && setDialogOpen(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onClose={handleOpenChange}>
        <p className="mx-5 my-3 text-xl">Sign in</p>
        <DialogContent>
            <div className="gap-2 mt-1 max-w-none">
                <p>Name:</p>
                <input className="rounded-md bg-gray-200 mt-2 w-full p-3"
                placeholder="User name"
                type="text"
                defaultValue={searchParams.get("username") ?? ""}
                ref={usernameInputRef}
                />
                {usernameError && (
                <p className="col-start-2 text-xs text-red-500 mt-1">
                    Invalid username, use only{" "}
                    <span className="font-mono">[a-z0-9 ]</span>, must be between 1
                    and 50 characters long.
                </p>
                )}
            </div>
        </DialogContent>
        <DialogActions>
          <button onClick={handleSave} className="mx-2 mb-2 border-2 p-2 rounded-md">start</button>
        </DialogActions>
    </Dialog>
  );
}
