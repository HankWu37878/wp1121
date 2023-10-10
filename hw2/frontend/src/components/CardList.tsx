import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
//import useCards from "@/hooks/useCards";


export type CardListProps = {
  id: string;
  name: string;
  number: number;
};

export default function CardList({ name, number }: CardListProps) {
  //const { fetchLists } = useCards();

  /*const handleDelete = async () => {
    try {
      await deleteList(id);
      fetchLists();
    } catch (error) {
      alert("Error: Failed to delete list");
    }
  };*/

  return (
    <>
      <Paper sx={{width:230}}>
        <Box sx={{ml:"auto" ,mr:"auto"}}><img src="https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg" width={"100%"}></img></Box>
        <Typography sx={{ml:1, fontSize: 18, overflow:"scroll", width:"95%", height:20, mt:1, mr:1}}>{name}</Typography>
        <Typography sx={{fontStyle:"italic", ml:1, fontSize: 14, color:"GrayText"}}>{number} Songs</Typography>
      </Paper>
    </>
  );
}
