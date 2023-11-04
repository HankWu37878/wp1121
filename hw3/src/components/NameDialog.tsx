"use client";

import { useEffect, useRef, useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

// all components is src/components/ui are lifted from shadcn/ui
// this is a good set of components built on top of tailwindcss
// see how to use it here: https://ui.shadcn.com/

import { validateUsername } from "@/lib/utils";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

export default function NameDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const [usernameError, setUsernameError] = useState(false);

  useEffect(() => {
    const username = searchParams.get("username");
    // if any of the username or handle is not valid, open the dialog
    setDialogOpen(!validateUsername(username));
  }, [searchParams]);

  const handleSave = () => {
    const username = usernameInputRef.current?.value;

    const newUsernameError = !validateUsername(username);
    setUsernameError(newUsernameError)

    if (newUsernameError) {
      return false;
    }

    // when navigating to the same page with different query params, we need to
    // preserve the pathname, so we need to manually construct the url
    // we can use the URLSearchParams api to construct the query string
    // We have to pass in the current query params so that we can preserve the
    // other query params. We can't set new query params directly because the
    // searchParams object returned by useSearchParams is read-only.
    const params = new URLSearchParams(searchParams);
    params.set("username", username!);
    router.push(`${pathname}?${params.toString()}`);
    setDialogOpen(false);

    return true;
  };

  // The Dialog component calls onOpenChange when the dialog wants to open or
  // close itself. We can perform some checks here to prevent the dialog from
  // closing if the input is invalid.
  const handleOpenChange = (open: boolean) => {
    if (open) {
      setDialogOpen(true);
    } else {
      // if handleSave returns false, it means that the input is invalid, so we
      // don't want to close the dialog
      handleSave() && setDialogOpen(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onClose={handleOpenChange}>
        <DialogTitle>Welcome to Join me!</DialogTitle>
        <DialogContent>
            <div className="gap-2 mt-1 max-w-none">
                <p>Name:</p>
                <TextField className="rounded-md bg-slate-200 mt-2 border-0 w-full"
                placeholder="User name"
                defaultValue={searchParams.get("username") ?? ""}
                inputRef={usernameInputRef}
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
