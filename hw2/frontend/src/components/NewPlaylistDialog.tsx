import { useRef, useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Album as AlbumIcon } from "@mui/icons-material";
import { Grid } from "@mui/material";
import useCards from "@/hooks/useCards";
import { createList } from "@/utils/client";
import { AlertDialog } from "./AlertDialog";


type NewPlaylistDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function NewListDialog({ open, onClose }: NewPlaylistDialogProps) {
  const textfieldRef1 = useRef<HTMLInputElement>(null);
  const textfieldRef2 = useRef<HTMLInputElement>(null);
  const [AlertOpen, setAlertOpen] = useState(false);
  const [AlertContent, setAlertContent] = useState("");
  
  const { fetchLists, lists } = useCards();

  const handleAddList = async () => {
    if(textfieldRef1.current?.value === "" || textfieldRef2.current?.value === "" )
      {
        setAlertOpen(true);
        setAlertContent("Please enter some playlist name and description!")
        return;
      }
    else if (lists.some(list => list.name === textfieldRef1.current?.value))
    {
      setAlertOpen(true);
      setAlertContent("The playlist has already existed! Please enter a new playlist name!");
      return;
    }
    try {
      await createList({ name: textfieldRef1.current?.value ?? "" , description: textfieldRef2.current?.value ?? ""});
      fetchLists();
    } catch (error) {
      alert("Error: Failed to create list");
    } finally {
      onClose();
    }
  };

  return (
    <>
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{mt:2, ml:2, letterSpacing:1}}>
        <AlbumIcon className='mr-2' sx={{mr:1, fontSize:20, verticalAlign:"top"}}/>
        Add a Playlist</DialogTitle>
      <DialogContent>
        <Grid sx={{width: 500}}>
            <TextField
            inputRef={textfieldRef1}
            label="Playlist Name"
            variant="filled"
            sx={{ mt: 2, ml: 5, width: "40%", letterSpacing:1}}
            autoFocus
            />
        </Grid>
      </DialogContent>
      <DialogContent>
        <Grid>
            <TextField
                inputRef={textfieldRef2}
                multiline
                minRows={5}
                maxRows={5}
                label="Description"
                variant="filled"
                sx={{ mt: 0, ml:5 , width:"85%", letterSpacing:1, overflow: "scroll"}}
                autoFocus
            />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleAddList()}>add</Button>
        <Button onClick={onClose}>cancel</Button>
      </DialogActions>
    </Dialog>
    <AlertDialog
      open={AlertOpen}
      onClose={() => setAlertOpen(false)}
      content={AlertContent}
    />
    </>
  );
}
