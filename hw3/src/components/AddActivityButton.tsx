"use client";

import { useState } from "react";
import AddActivtyDialog from "./AddActivityDialog";


export default function AddActivityButton()
{
    const [addActivtyDialogOpen, setAddActivityDialogOpen] = useState(false);
    return (
        <>
            <button className="border-2 rounded-md p-2 px-3 shadow-sm bg-lime-100 h-1/2" onClick={() => (setAddActivityDialogOpen(true))}>
                Add Activities
            </button>
            <AddActivtyDialog 
            open={addActivtyDialogOpen} 
            onClose={() => (setAddActivityDialogOpen(false))}/>
        </>
    );
}