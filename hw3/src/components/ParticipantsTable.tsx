"use client"
import usePost from "@/hooks/usePost";
import useUserInfo from "@/hooks/useUserInfo";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import moment from "moment";
import { useState } from "react";

type ParticipantsTableProps = {
    startDate: string;
    endDate: string;
    participants: number;
    activityId: number;
    available: { activityId: number; username: string; row: number; col: number; }[];
    TotalTimeState: { activityId: number; row: number; col: number; }[];
    joined: boolean;
}

export default function ParticipantsTable({ startDate, endDate, joined, activityId, available, TotalTimeState }: ParticipantsTableProps) {
    const [edittingMode, setEdittingMode] = useState(false);
    const { postAvailable, deleteAvailable } = usePost();
    const { username } = useUserInfo();
    const start = moment(startDate.substring(0,10));
    const end = moment(endDate.substring(0,10));
    const startHr = parseInt(startDate.substring(11));
    let endHr = parseInt(endDate.substring(11));
    let dateRange = end.diff(start, "days") + 1;
    if (endDate[endDate.length - 1] === "0")
        dateRange--;
    const dateArray = [];
    const d:number[] = new Array(0);
    for (let i = 0; i < dateRange; i++)
    {
        d.push(i);
        const new_date = moment(start, "YYYY-MM-DD").add(i+1, 'days').toISOString();
        dateArray.push({month: new_date.substring(5,7), date: new_date.substring(8,10)});
    }

    const timeArray = [];
    for (let i = 0; i < 24; i++)
    {
        timeArray.push(i);
    }

    const handleOnMouse = () => {
        if (!joined) {
            setChosen(Array(24).fill(false).map(() => Array (dateRange).fill(false)));
            return;
        }
            
        setEdittingMode(true);
    }

    
    const chosenArr = Array(24).fill(false).map(() => Array (dateRange).fill(false));
    available.map((e) => (chosenArr[e.row][e.col] = true));
    const [chosen, setChosen] = useState(chosenArr);
    
    if (endHr === 0)
        endHr = 24;

    const totalArr = Array(24).fill(0).map(() => Array (dateRange).fill(0));
    for (let i = 0; i < startHr; i++) {
        totalArr[i][0] = -1;
    }
    for (let i = endHr; i < 24; i++) {
        totalArr[i][dateRange-1] = -1;
    }
    TotalTimeState.map((e) => (totalArr[e.row][e.col]++));
    


    const handleLeave = () => {
        if (!joined)
            return;
        setEdittingMode(false);
    }

    

    const handleOnclick = async(timeStaterows: number, timeStatecols: number) => {
        if (!edittingMode)
            return;
        if (totalArr[timeStaterows][timeStatecols] === -1)
            return;

        if (username) {
            const newchosen = [...chosen];
            if (newchosen[timeStaterows][timeStatecols] === false)
            {
                try{
                    await postAvailable({   
                            username , 
                            activityId, 
                            timeStaterows, 
                            timeStatecols,
                        }
                    );
                    newchosen[timeStaterows][timeStatecols] = true;
                }
                catch (e) {
                    console.error(e);
                    alert("Error posting available");
                }
            }

            else {
                try{
                    await deleteAvailable({   
                            username , 
                            activityId, 
                            timeStaterows, 
                            timeStatecols,
                        }
                    );
                    newchosen[timeStaterows][timeStatecols] = false;
                }
                catch (e) {
                    console.error(e);
                    alert("Error deleting available");
                }
            }
            setChosen(newchosen);
        }
            

    }

    return(
        <div className="w-1/2 mx-auto" onMouseEnter={handleOnMouse} onMouseLeave={handleLeave}>
            <Table className="border-2" size="small" id="pt_Table">
                <TableHead>
                    <TableRow>
                        <TableCell className="border-2 w-12" align="center"></TableCell>
                        {dateArray.map((d) => (
                            <TableCell className="w-16 border-2" key={null} align="center">{d.month + "/" + d.date}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {timeArray.map((time) => 
                    <TableRow key={time} className="h-2">
                        <TableCell className="border-2" padding="checkbox" align="center">{time}</TableCell>
                        {d.map((e) => (<TableCell id={time.toString() + " " +e.toString()} key={e} 
                        className={cn("h-2 border-2", chosen[time][e] && edittingMode  && "border-red-600 border-4", totalArr[time][e] === -1 && "bg-gray-500", totalArr[time][e] === 1 && "bg-green-100", totalArr[time][e] === 2 && "bg-green-300", totalArr[time][e] === 3 && "bg-green-500", totalArr[time][e] === 4 && "bg-green-700", totalArr[time][e] === 5 && "bg-green-900", totalArr[time][e] >= 6 && "bg-green-950")} align="center" onClick={() => handleOnclick(time, e)}></TableCell>))}
                    </TableRow>)}
                </TableBody>
            </Table>
        </div>
        
    );
}