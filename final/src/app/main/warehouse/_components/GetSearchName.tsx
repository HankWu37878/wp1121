"use client";

import { useRef } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Search } from "lucide-react";
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from "@mui/material";

export default function GetSerachName() {
  const searchInputRef = useRef<HTMLInputElement>(null);;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleCancelSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.set("searchName", ""!);
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  const handleSearch = () => {
    const searchString = searchInputRef.current?.value;
    if (searchString === "") {
      alert("Please fill in the product name you want to search");
      return;
    }
    const params = new URLSearchParams(searchParams);
    params.set("searchName", searchString!);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative flex w-full flex-wrap items-stretch">
      <input
        type="search"
        className="relative m-0 -mr-0.5 block w-72 min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:text-teal-900 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-teal-900 dark:text-neutral-200 dark:placeholder:text-neutral-200"
        placeholder="Search product"
        aria-label="Search"
        aria-describedby="button-addon1"
        ref={searchInputRef}
      >
      </input>
      <div className="border-2">
        <IconButton onClick={handleCancelSearch}>
          <CancelIcon/>
        </IconButton>
      </div>

      <button
        className="hover:shadow-xs relative z-[2] flex items-center rounded-r bg-gray-300 px-6 py-2.5 text-xs font-medium shadow-md focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
        type="button"
        id="button-addon1"
        onClick={handleSearch}
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <Search />
      </button>
    </div>
  );
}
