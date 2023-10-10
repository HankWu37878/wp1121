import { useRef, useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import MusicIcon from "@mui/icons-material/MusicNote";
import { Grid } from "@mui/material";
import useCards from "@/hooks/useCards";
import { createCard } from "@/utils/client";
import type { SongProps } from "./Song";
import { AlertDialog } from "./AlertDialog";


//import useCards from "@/hooks/useCards";
//import { createList } from "@/utils/client";

type NewSongDialogProps = {
  open: boolean;
  onClose: () => void;
  listId: string;
  state: boolean[];
  songs: SongProps[];
};

export default function NewSongDialog({ open, onClose , listId, state, songs}: NewSongDialogProps) {
  // using a ref to get the dom element is one way to get the value of a input
  // another way is to use a state variable and update it on change, which can be found in CardDialog.tsx
  const textfieldRef1 = useRef<HTMLInputElement>(null);
  const textfieldRef2 = useRef<HTMLInputElement>(null);
  const textfieldRef3 = useRef<HTMLInputElement>(null);
  const [AlertOpen, setAlertOpen] = useState(false);
  const [AlertContent, setAlertContent] = useState("");
  const { fetchCards } = useCards();

  const handleAddSong = async () => {
    if(textfieldRef1.current?.value === "" || textfieldRef2.current?.value === "" ||  textfieldRef3.current?.value === "")
      {
        setAlertOpen(true);
        setAlertContent("Please enter some song name, singer and link!")
        return;
      }
    else if (songs.some(song => song.name === textfieldRef1.current?.value))
    {
      setAlertOpen(true);
      setAlertContent("The song has already existed! Please enter a new song name!");
      return;
    }
    try {
      state.push(false);
      await createCard({ name: textfieldRef1.current?.value ?? "" , singer: textfieldRef2.current?.value ?? "", link: textfieldRef3.current?.value ?? "", list_id: listId});
      fetchCards();
    } catch (error) {
      alert("Error: Failed to create card");
    } finally {
      onClose();
    }
  };

  return (
    <>
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{mt:2, ml:2, letterSpacing:1}}>
        <MusicIcon className='mr-2' sx={{mr:1, fontSize:20, verticalAlign:"top"}}/>
        Add a Song</DialogTitle>
      <DialogContent>
        <Grid>
            <TextField
            inputRef={textfieldRef1}
            label="Song Name"
            variant="filled"
            sx={{ mt: 2, ml: "5%",width: "85%", letterSpacing:1}}
            autoFocus
            />
        </Grid>
      </DialogContent>
      <DialogContent>
        <Grid>
                <TextField
                inputRef={textfieldRef2}
                label="Singer"
                variant="filled"
                sx={{ mt: 2, ml: "5%", width: "85%", letterSpacing:1}}
                autoFocus
                />
        </Grid>
      </DialogContent>
      <DialogContent>
        <Grid>
                <TextField
                inputRef={textfieldRef3}
                label="Link"
                variant="filled"
                sx={{ mt: 2, ml: "5%", width: "85%", letterSpacing:1}}
                autoFocus
                />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleAddSong()}>add</Button>
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
