"use client"

import { IconButton } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { useState } from 'react';

export default function LeftDrawerButton() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const handleOnClick = () => {
        if (drawerOpen === false)
            setDrawerOpen(true);
        else
            setDrawerOpen(false);
    }

    return (
        <>
            <div className='flex-col mt-4 ml-5'>
                <IconButton onClick={handleOnClick}>
                    <TuneIcon/>
                </IconButton>
                
                {drawerOpen &&     
                    <div className="w-72 p-5 mt-3 border-2 border-gray-300 rounded-2xl h-screen overflow-scroll">
                        Filter
                    </div>
                }
            </div>
        </>
        );
}