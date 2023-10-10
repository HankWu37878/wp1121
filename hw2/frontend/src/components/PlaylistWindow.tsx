import { Checkbox, ClickAwayListener, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Input, Link } from "@mui/material";
import { Box, Container, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Add as AddIcon, Edit } from "@mui/icons-material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import NewSongDialog from "./NewSongDialog";
import { useRef, useState } from "react";
import type { SongProps } from "./Song";
import useCards from "@/hooks/useCards";
import { deleteCard, updateList } from "@/utils/client";
import EditSongDialog from "./EditSongDialog";
import AddtoAnotherListDialog from "./AddtoAnotherListDialog";
import { AlertDialog } from "./AlertDialog";

export type PlaylistWindowProps = {
  id: string,
  name: string;
  description: string;
  songs: SongProps[];
}




export default function PlaylistWindow({id, name, description, songs}: PlaylistWindowProps) {
  const [NewSongDialogOpen,setNewSongDialogOpen] = useState(false);
  const [edittingName, setEdittingName] = useState(false);
  const [edittingDescription, setEdittingDescription] = useState(false);
  const [whichtoedit, setwhichtoedit] = useState("");
  const [deletingSong, setDeletingSong] = useState(false);
  const [openAddAnotherDialog, setOpenAddAnotherDialog] = useState("");

  const [checkedState, setCheckedState] = useState(Array(songs.length).fill(false));
  const [allCheck, setAllCheck] = useState(false);
  const { fetchLists, fetchCards, lists } = useCards();

  const [AlertOpen, setAlertOpen] = useState(false);
  const [AlertContent, setAlertContent] = useState("");


  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);

  const handleChange = (index: number) =>
  {
    const newcheckboxsState:boolean[] = [...checkedState];
    if (newcheckboxsState[index] === true)
      newcheckboxsState[index] = false;
    else
      newcheckboxsState[index] = true;

    setCheckedState(newcheckboxsState);
    if (newcheckboxsState.every(check => check===true))
      setAllCheck(true);
    else
      setAllCheck(false);
  }


  const handleAllSelect = () =>
  {
    if (songs.length === 0)
    {
      setAlertOpen(true);
      setAlertContent("please add some song!");
      return;
    }
    const newcheckboxsState:boolean[] = [...checkedState];
    if (allCheck === true)
    { 
      newcheckboxsState.fill(false);
      setCheckedState(newcheckboxsState);
      setAllCheck(false);
    }

    else if (allCheck === false)
    {
      newcheckboxsState.fill(true);
      setCheckedState(newcheckboxsState);
      setAllCheck(true);
    }
  }


  const handleDelete = async() =>
  {
    const deletePreparing: string[] = [];
    checkedState.forEach((check,index) => {if (check === true) deletePreparing.push(songs[index].id);})
    deletePreparing.map(songId => deleteSong(songId));
    setDeletingSong(false);
    setAllCheck(false);
  }

  async function deleteSong(id: string)
  {
    setCheckedState(Array(songs.length - 1).fill(false));
    await deleteCard(id);
    fetchCards();
  }

  const handleUpdateName = async () => {
    if (!inputRef1.current) return;
    if(inputRef1.current?.value === "")
      {
        setAlertOpen(true);
        setAlertContent("Please enter a playlist name!")
        setEdittingName(false);
        return;
      }
    else if (inputRef1.current?.value === name)
    {
      setEdittingName(false);
      return;
    }
    else if (lists.some(list => list.name === inputRef1.current?.value))
    {
      setAlertOpen(true);
      setAlertContent("The playlist has already existed! Please enter a new playlist name!");
      setEdittingName(false);
      return;
    }
    

    const newName = inputRef1.current.value;
    if (newName !== name) {
      try {
        await updateList(id, { name: newName });
        fetchLists();
      } catch (error) {
        alert("Error: Failed to update list name");
      }
    }
    setEdittingName(false);
  };

  const handleUpdateDescription = async () => {
    if (!inputRef2.current) return;

    if(inputRef2.current?.value === "")
      {
        setAlertOpen(true);
        setAlertContent("Please enter some playlist description!")
        setEdittingDescription(false);
        return;
      }

    const newDescription = inputRef2.current.value;
    if (newDescription !== description) {
      try {
        await updateList(id, { description: newDescription });
        fetchLists();
      } catch (error) {
        alert("Error: Failed to update list description");
      }
    }
    setEdittingDescription(false);
  };

  const handleDeleteClick = async() =>
  {
    if (checkedState.every(check => check === false))
    {
      setAlertOpen(true);
      setAlertContent("Please choose some songs to delete!");
      return;
    }
      
    setDeletingSong(true);
  }

  
  return (
    <>
      <Container maxWidth={false} sx={{backgroundColor:"white", height: "150%", position:"absolute", zIndex:100}} disableGutters>
        <Container  maxWidth={false} sx={{mt:"2%",paddingBottom:"3%", width:"90%"}}>
          <Grid container direction={"row"} sx={{letterSpacing:1, paddingBottom:"3%", width:"100%"}}>
            <Grid>
              <img src="https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg"></img>
            </Grid>
            
            <Grid container direction={"column"} sx={{ml:8, width: "50%"}}>
              {edittingName? (
                <ClickAwayListener onClickAway={handleUpdateName}>
                  <Input
                    autoFocus
                    defaultValue={name}
                    className="grow"
                    placeholder="Enter a new name for this list..."
                    sx={{ fontSize: "2rem", width:"35%" }}
                    inputRef={inputRef1}
                  />
                </ClickAwayListener>
              ) : (<button onClick={() => setEdittingName(true)} style={{background:"transparent", border:"none", textAlign:"left"}}>
                    <Typography sx={{color:"GrayText", fontSize:"200%", letterSpacing:1}}>{name}</Typography>
                  </button>)}

              {edittingDescription? (
                <ClickAwayListener onClickAway={handleUpdateDescription}>
                  <Input
                    autoFocus
                    defaultValue={description}
                    className="grow"
                    placeholder="Enter a new description for this list..."
                    sx={{ fontSize: "2rem", width:"35%" }}
                    inputRef={inputRef2}
                  />
                </ClickAwayListener>
              ) : (
                <Box sx={{ml:4, mt:2, color:"darkgrey", width:"80%", height:"50%", overflow:"scroll"}}>
                  <button onClick={() => setEdittingDescription(true)} style={{background: "transparent", border: "none", textAlign:"left", color:"GrayText", fontSize:16, letterSpacing:1}}>
                    {description}
                  </button></Box>)}
              
            </Grid> 
            
          </Grid>
          <Divider variant="fullWidth">
              <Grid mdOffset="auto">
                    <Button variant="contained" size="large" onClick = {() => {setNewSongDialogOpen(true); setCheckedState(Array(songs.length).fill(false)); setAllCheck(false)}} sx={{fontWeight: 600, letterSpacing: 1,mr: "10%", border: 1, maxWidth: "45%"}}>
                        <AddIcon className="mr-2" sx={{mr:1}}/>
                        Add
                    </Button>
                    <Button onClick={handleDeleteClick} variant="contained" size="large" sx={{fontWeight: 600, letterSpacing: 1, border: 1, maxWidth: "45%"}}>
                        <DeleteIcon className="mr-2" sx={{mr:1}}/>
                        Delete
                    </Button>
                    <Dialog 
                      open={deletingSong}
                    >
                      <DialogTitle>Sure to delete?</DialogTitle>
                      <DialogContent>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell width={"30%"} align="left" sx={{letterSpacing:1, fontWeight:700}}>Song</TableCell>
                              <TableCell width={"30%"} align="left" sx={{letterSpacing:1, fontWeight:700}}>Singer</TableCell>
                              <TableCell width={"30%"} align="left" sx={{letterSpacing:1, fontWeight:700}}>Link</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                          {checkedState.map((check, index) => (check === true)? (
                          <>
                            <TableRow>
                              <TableCell sx={{letterSpacing:1}}>{songs[index].name}</TableCell>
                              <TableCell sx={{letterSpacing:1}}>{songs[index].singer}</TableCell>
                              <TableCell sx={{letterSpacing:1}}>{songs[index].link}</TableCell>
                            </TableRow>
                          </>):(<></>))}
                          </TableBody>
                        </Table>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => setDeletingSong(false)}>Cancel</Button>
                        <Button onClick={handleDelete}>Sure</Button>
                      </DialogActions>
                    </Dialog>
                    
                    
              </Grid>
          </Divider>
        </Container>

        <TableContainer component={Paper} sx={{width:"90%", margin:"auto"}}>
          <Table>
            <TableHead>
              <TableRow  sx={{backgroundColor:"#E0E0E0"}}>
                <TableCell width={20}>
                    <Checkbox  checked={allCheck} onChange={() => handleAllSelect()}/>
                </TableCell>
                <TableCell width={"30%"} align="left" sx={{letterSpacing:1, fontWeight:700}}>Song</TableCell>
                <TableCell width={"30%"} align="left" sx={{letterSpacing:1, fontWeight:700}}>Singer</TableCell>
                <TableCell width={"30%"} align="left" sx={{letterSpacing:1, fontWeight:700}}>Link</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {songs.map((song, index) => 
              <>
                <TableRow>
                  <TableCell>
                    <Checkbox checked={checkedState[index]} onChange={() => handleChange(index)}/>
                  </TableCell>
                  <TableCell sx={{letterSpacing:1}}>{song.name}</TableCell>
                  <TableCell sx={{letterSpacing:1}}>{song.singer}</TableCell>
                  <TableCell sx={{letterSpacing:1}}><Link href={song.link} target={"_blank"}>{song.link}</Link></TableCell>
                  <TableCell>
                    <IconButton size="medium" onClick={() => setOpenAddAnotherDialog(song.id)}><AddIcon/></IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton size="medium" onClick={() => setwhichtoedit(song.id)}><Edit></Edit></IconButton>
                  </TableCell>
                </TableRow>
                <EditSongDialog
                  open = {whichtoedit === song.id}
                  onClose={() => setwhichtoedit("")}
                  song = {song.name}
                  singer= {song.singer}
                  link={song.link}
                  id={song.id}
                  playlistId={song.playlistId}
                  songs={songs}
                />

                <AddtoAnotherListDialog
                  open = {openAddAnotherDialog === song.id}
                  onClose={() => setOpenAddAnotherDialog("")}
                  name = {song.name}
                  singer = {song.singer}
                  link = {song.link}
                  listId={id}
                />
                
              </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <NewSongDialog
            open = {NewSongDialogOpen}
            onClose={() => setNewSongDialogOpen(false)}
            listId={id}
            state={checkedState}
            songs={songs}
            />  
      <AlertDialog
        open={AlertOpen}
        onClose={() => setAlertOpen(false)}
        content={AlertContent}
      />

    </>
  );
}