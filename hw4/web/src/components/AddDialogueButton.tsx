"use client";

import { IconButton } from "@mui/material"
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useState } from "react";
import AddDialogueDialog from "./AddDialogueDialog";


export default function AddDialogueButton() {
    const [addDialogueDialogOpen, setAddDialogueDialogOpen] =useState(false);
    return (
        <>
            <IconButton size="small" onClick={() => (setAddDialogueDialogOpen(true))}>
                <AddBoxOutlinedIcon fontSize="large"/>
            </IconButton>
            <AddDialogueDialog open={addDialogueDialogOpen} onClose={() => (setAddDialogueDialogOpen(false))}/>
        </>
    );
}