import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { MenuItem, Select, Typography } from "@mui/material";
import useCards from "@/hooks/useCards";
import { createCard } from "@/utils/client";
import type { SelectChangeEvent } from "@mui/material/Select/SelectInput";



export type AddtoOtherListDialogProps = {
  open: boolean;
  onClose: () => void;
  name: string;
  singer: string;
  link: string;
  listId: string;
};

export default function AddtoAnotherListDialog({ open, onClose, name, singer, link, listId}: AddtoOtherListDialogProps) {
  const { fetchLists, fetchCards, lists } = useCards();
  const [playlist, setplaylist] = useState("");

  const handleCopySong = async () => {
    if (playlist === "")
        return;
    try {
      await createCard({ name: name , singer: singer, link: link, list_id: playlist});
      fetchLists();
      fetchCards();
    } catch (error) {
      alert("Error: Failed to add card");
    } finally {
      onClose();
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setplaylist(event.target.value as string);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{letterSpacing:1, width:300, height:80}}>
        <Typography variant="h6">Add {name} to?</Typography>
      </DialogTitle>
      <DialogContent>
        <Select onChange={handleChange} sx={{width:"100%"}}>
            {lists.filter(list => list.id!==listId).map(list => (<MenuItem value={list.id} key={list.id}>{list.name}</MenuItem>))}
        </Select>
      </DialogContent>
     
      <DialogActions>
        <Button onClick={() => handleCopySong()}>sure</Button>
        <Button onClick={onClose}>cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
