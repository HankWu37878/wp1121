"use client"

import { useRef, useState } from "react";
import { postComment } from "./actions";
import { useRouter } from "next/navigation";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarRateIcon from '@mui/icons-material/StarRate';

type ReviewInputProps = {
  userId: string;
  productId: string;
}

export default function ReviewInput({ userId, productId }: ReviewInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [starState, setStarState] = useState(0);

  const handleSendComment = async() => {
    const commentContent = inputRef.current?.value;
    if (!commentContent) {
      alert("Please fill in some content");
      return;
    }

    if (!starState) {
      alert("Please fill in the star rate");
      return;
    }
      
    await postComment(productId, userId, commentContent, starState);
    inputRef.current.value = "";
    setStarState(0);
    router.refresh();
  }



  return (
    <>
      <div className="flex h-12 w-full px-5 mt-2 justify-between">
        <input
          placeholder="Aa"
          className="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-3/4 rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
          name="productReview"
          ref={inputRef}
        />
        <button
          className="h-9 rounded-md border-2 bg-teal-900 px-4 text-white hover:bg-teal-700"
          type="submit"
          onClick={handleSendComment}
        >
          Send
        </button>
      </div>
      <div className="flex gap-2 mt-2 justify-center">
        {starState === 0 && 
        <>
          <button onClick={() => setStarState(1)}><StarOutlineIcon/></button>
          <button onClick={() => setStarState(2)}><StarOutlineIcon/></button>
          <button onClick={() => setStarState(3)}><StarOutlineIcon/></button>
          <button onClick={() => setStarState(4)}><StarOutlineIcon/></button>
          <button onClick={() => setStarState(5)}><StarOutlineIcon/></button>
        </>}
        {starState === 1 && 
        <>
          <button onClick={() => setStarState(1)}><StarRateIcon className="text-yellow-500"/></button>
          <button onClick={() => setStarState(2)}><StarOutlineIcon/></button>
          <button onClick={() => setStarState(3)}><StarOutlineIcon/></button>
          <button onClick={() => setStarState(4)}><StarOutlineIcon/></button>
          <button onClick={() => setStarState(5)}><StarOutlineIcon/></button>
        </>}
        {starState === 2 && 
        <>
          <button onClick={() => setStarState(1)}><StarRateIcon className="text-yellow-500"/></button>
          <button onClick={() => setStarState(2)}><StarRateIcon className="text-yellow-500"/></button>
          <button onClick={() => setStarState(3)}><StarOutlineIcon/></button>
          <button onClick={() => setStarState(4)}><StarOutlineIcon/></button>
          <button onClick={() => setStarState(5)}><StarOutlineIcon/></button>
        </>}
        {starState === 3 && 
        <>
          <button onClick={() => setStarState(1)}><StarRateIcon className="text-yellow-500"/></button>
          <button onClick={() => setStarState(2)}><StarRateIcon className="text-yellow-500"/></button>
          <button onClick={() => setStarState(3)}><StarRateIcon className="text-yellow-500"/></button>
          <button onClick={() => setStarState(4)}><StarOutlineIcon/></button>
          <button onClick={() => setStarState(5)}><StarOutlineIcon/></button>
        </>}
        {starState === 4 && 
        <>
          <button onClick={() => setStarState(1)}><StarRateIcon className="text-yellow-500"/></button>
          <button onClick={() => setStarState(2)}><StarRateIcon className="text-yellow-500"/></button>
          <button onClick={() => setStarState(3)}><StarRateIcon className="text-yellow-500"/></button>
          <button onClick={() => setStarState(4)}><StarRateIcon className="text-yellow-500"/></button>
          <button onClick={() => setStarState(5)}><StarOutlineIcon/></button>
        </>}

        {starState === 5 && 
        <>
          <button onClick={() => setStarState(1)}><StarRateIcon className="text-yellow-500"/></button>
          <button onClick={() => setStarState(2)}><StarRateIcon className="text-yellow-500"/></button>
          <button onClick={() => setStarState(3)}><StarRateIcon className="text-yellow-500"/></button>
          <button onClick={() => setStarState(4)}><StarRateIcon className="text-yellow-500"/></button>
          <button onClick={() => setStarState(5)}><StarRateIcon className="text-yellow-500"/></button>
        </>}
  
      </div>
    </>
    
  );
}

