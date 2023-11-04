"use client";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Separator } from "@/components/ui/separator";
import usePost from "@/hooks/usePost";
import { useRef } from "react";
import useUserInfo from "@/hooks/useUserInfo";
import { useRouter } from "next/navigation";
import useParticipate from "@/hooks/useParticipate";
import moment from "moment";





type addActivtyDialogProps = {
    open:boolean;
    onClose: () => void;
};


export default function AddActivtyDialog({open, onClose}: addActivtyDialogProps) {
    const { postActivity } = usePost();
    const { joinActivity } = useParticipate();
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { username } = useUserInfo();
    const router = useRouter();
    const startHrRef = useRef<HTMLSelectElement>(null);
    const endHrRef = useRef<HTMLSelectElement>(null);
    const startDateRef = useRef<HTMLInputElement>(null);
    const endDateRef = useRef<HTMLInputElement>(null);
    const handlePostActivity = async() => {
        const content = textareaRef.current?.value;
        let startDate = startDateRef.current?.value;
        let endDate = endDateRef.current?.value;
        const startHr = startHrRef.current?.value;
        const endHr = endHrRef.current?.value;
        if (!content || !username) return;
        if (!startDate || !endDate || !startHr || !endHr) {
            alert("Please check that the start and end date are both valid!");
            return;
        }

        const start = moment(startDate);
        const end = moment(endDate);

        if ( start > end || moment(end).diff(start, "days") > 7 || (moment(end).diff(start, "days") === 7 && endHr > startHr)) {
            alert("Please check that the start and end date are both valid!");
            return;
        }

        startDate = startDate + " " + startHr;
        endDate = endDate + " " + endHr;


        try {
        const newActivityId = await postActivity({
            username,
            content,
            startDate,
            endDate,
        });
        textareaRef.current.value = "";
        await joinActivity({
            username,
            activityId:newActivityId,
        });

        router.push(`/activity/${newActivityId}?username=${username}`);

        } catch (e) {
            console.error(e);
            alert("Error posting activity");
        }
    };

    return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>
            Add an activity !
        </DialogTitle>
        <DialogContent>
            <div className="flex-col space-y-5 mt-1">
                <textarea className="w-full rounded-md bg-slate-200 overflow-scroll p-2 shadow-sm mb-2" placeholder="Activity title" rows={1} ref={textareaRef}/>
                <Separator/>
                <div className="flex space-x-16">
                    <div className="flex-col space-y-1">
                        <p className="text-sm">From:</p>
                        <input type="date" className="border-2 p-2 rounded-md" ref={startDateRef}></input>
                        <select className="p-2 ml-2 bg-white border-2 rounded-md" placeholder="start hour" ref={startHrRef}>
                            <option value={0}>0:00</option>
                            <option value={1}>1:00</option>
                            <option value={2}>2:00</option>
                            <option value={3}>3:00</option>
                            <option value={4}>4:00</option>
                            <option value={5}>5:00</option>
                            <option value={6}>6:00</option>
                            <option value={7}>7:00</option>
                            <option value={8}>8:00</option>
                            <option value={9}>9:00</option>
                            <option value={10}>10:00</option>
                            <option value={11}>11:00</option>
                            <option value={12}>12:00</option>
                            <option value={13}>13:00</option>
                            <option value={14}>14:00</option>
                            <option value={15}>15:00</option>
                            <option value={16}>16:00</option>
                            <option value={17}>17:00</option>
                            <option value={18}>18:00</option>
                            <option value={19}>19:00</option>
                            <option value={20}>20:00</option>
                            <option value={21}>21:00</option>
                            <option value={22}>22:00</option>
                            <option value={23}>23:00</option>
                        </select>    
                    </div>
                    
                    <div className="flex-col space-y-1">
                        <p className="text-sm">To:</p>
                        <input type="date" className="border-2 p-2 rounded-md" ref={endDateRef}></input>
                        <select className="p-2 ml-2 bg-white border-2 rounded-md" placeholder="end hour" ref={endHrRef}>
                            <option value={0}>0:00</option>
                            <option value={1}>1:00</option>
                            <option value={2}>2:00</option>
                            <option value={3}>3:00</option>
                            <option value={4}>4:00</option>
                            <option value={5}>5:00</option>
                            <option value={6}>6:00</option>
                            <option value={7}>7:00</option>
                            <option value={8}>8:00</option>
                            <option value={9}>9:00</option>
                            <option value={10}>10:00</option>
                            <option value={11}>11:00</option>
                            <option value={12}>12:00</option>
                            <option value={13}>13:00</option>
                            <option value={14}>14:00</option>
                            <option value={15}>15:00</option>
                            <option value={16}>16:00</option>
                            <option value={17}>17:00</option>
                            <option value={18}>18:00</option>
                            <option value={19}>19:00</option>
                            <option value={20}>20:00</option>
                            <option value={21}>21:00</option>
                            <option value={22}>22:00</option>
                            <option value={23}>23:00</option>
                        </select>    
                    </div>
                </div>
            </div>
        </DialogContent>
        <DialogActions>
            <button className="border-2 mr-5 p-2 rounded-md m-5 bg-red-100" onClick={onClose}>
                Cancel
            </button>
            <button className="border-2 ml-5 p-2 px-4 rounded-md m-5 bg-lime-100" onClick={handlePostActivity}>
                Add
            </button>
        </DialogActions>

    </Dialog>
    );
}