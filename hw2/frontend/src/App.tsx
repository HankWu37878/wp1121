import HeaderBar from "@/components/HeaderBar";
import CardList from "./components/CardList";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import PlaylistWindow from "./components/PlaylistWindow";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Delete as DeleteIcon } from "@mui/icons-material";
import { Album as AlbumIcon } from "@mui/icons-material";
import { Add as AddIcon } from "@mui/icons-material";
import { Paper, Typography } from '@mui/material';
import NewPLaylistDialog from "@/components/NewPlaylistDialog";
import useCards from "./hooks/useCards";
import { deleteList } from "./utils/client";

function App()
{
    const [windowopen, setwindowopen] = useState(false);
    const [whichwindowopen, setwhichwindowopen] = useState("");
    const [NewPLaylistDialogOpen,setNewPlaylistDialogOpen] = useState(false);
    const [DeleteModeOpen,setDeleteModeOpen] = useState(false);
    const { lists, fetchLists, fetchCards } = useCards();

    useEffect(() => {
        fetchLists();
        fetchCards();
      }, [fetchCards, fetchLists]);

    

    async function HandleDeleteList(id: string)
    {
        try {
            await deleteList(id);
            await fetchCards();
            await fetchLists();
        } catch (error) {
            alert("Error: Failed to delete list");
        }
    }
    
    function windowIndex()
    {
        return lists.findIndex((playlist) => (playlist.id === whichwindowopen));
    }
    return (
        <>
            <HeaderBar/>
            {windowopen? (<></>) : (
            <>
                <Grid container columnSpacing={10} sx={{ paddingBottom: 3,mt :7, mr: 10, ml: 10, borderBottom: 1, borderBlockColor: 'lightslategrey'}}>
                <Grid>
                    <Typography variant='h4' component="div" color="GrayText" fontWeight={600} letterSpacing={1}>
                    <AlbumIcon className='mr-2' sx={{mr:2, fontSize:30, verticalAlign:"top"}}/>
                        My Playlists
                    </Typography>
                </Grid>
                <Grid mdOffset="auto">
                    <Button variant="outlined" size="large" onClick = {() => setNewPlaylistDialogOpen(true)} sx={{fontWeight: 600, letterSpacing: 1,mr: 4, border: 1, width: 110}}>
                        <AddIcon className="mr-2" sx={{mr:1}}/>
                        Add
                    </Button>
                    {DeleteModeOpen? (
                            <Button variant="contained" onClick={() => setDeleteModeOpen(false)} size="large" sx={{fontWeight: 600, letterSpacing: 1, border: 0, width: 120}}>
                                Done
                            </Button>
                        ):(
                            <Button variant="outlined" onClick={() => setDeleteModeOpen(true)} size="large" sx={{fontWeight: 600, letterSpacing: 1, border: 1, width: 120}}>
                                <DeleteIcon className="mr-2" sx={{mr:1}}/>
                                    Delete
                            </Button>
                        )}
                    
                </Grid>
                </Grid>
                <NewPLaylistDialog
                open = {NewPLaylistDialogOpen}
                onClose={() => setNewPlaylistDialogOpen(false)}
                />
                <Grid container columnGap={"7%"} rowGap={10} justifyContent={"space-between"}  sx={{ mr: 10, ml:10, mt:5}}>
                    {lists.map((playlist) => 
                    <Grid container direction={"row"} key={playlist.id}>
                        <button onClick={() => {setwindowopen(true); setwhichwindowopen(playlist.id);}} style={{background: "transparent", border: "none", textAlign:"left", letterSpacing:1}}>
                            <CardList
                                id={playlist.id}
                                name={playlist.name}
                                number={playlist.songs.length}
                            />
                        </button>
                        {DeleteModeOpen? (<Grid><IconButton size="small" color="error" onClick={() => HandleDeleteList(playlist.id)}><DeleteIcon/></IconButton></Grid>) : (<></>)}
                    </Grid>)}

                    <Grid><Paper sx={{width:230}}></Paper></Grid>
                    <Grid><Paper sx={{width:230}}></Paper></Grid>
                    <Grid><Paper sx={{width:230}}></Paper></Grid>
                    <Grid><Paper sx={{width:230}}></Paper></Grid>
                    <Grid><Paper sx={{width:230}}></Paper></Grid>
                </Grid>
            </>)}
            
            {windowopen? (
            <>
                <IconButton
                    size="medium"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ ml: 2, mt:2 }}
                    onClick={() => {setwindowopen(false); setwhichwindowopen("");}}
                    >
                    <ArrowBackIcon />
                </IconButton>
                <PlaylistWindow
                    id={lists[windowIndex()].id}
                    name={lists[windowIndex()].name} 
                    description={lists[windowIndex()].description}
                    songs={lists[windowIndex()].songs}
                />
            </>):(<>/</>)}
                

        </>);
}

export default App;