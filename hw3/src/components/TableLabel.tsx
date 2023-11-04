"use client"

import { cn } from "@/lib/utils";
import { Table, TableCell, TableRow } from "@mui/material"
type TabelLabelProps = {
    participants: number;
}

export default function TabelLabel( {participants} : TabelLabelProps) {
    const temp = [];
    if (participants > 6)
        participants = 6;
    for (let i = 0; i < participants + 1; i++) {
        temp.push(i);
    }

    return (
        <div className="flex w-1/2 mx-auto mt-10 gap-5">
            <p>0/{participants}</p>
            <Table>
                <TableRow>
                    {temp.map((t) => (<TableCell key={null} size="small" className={cn("border-2", t === 1 && "bg-green-100", t === 2 && "bg-green-300", t === 3 && "bg-green-500", t === 4 && "bg-green-700", t === 5 && "bg-green-900", t >= 6 && "bg-green-950")}></TableCell>))}
                </TableRow>
            </Table>
            <p>{participants}/{participants}</p>
        </div>
    );
}