import { Paper } from "@mui/material";


export type SongProps = {
  id: string;
  name: string;
  singer: string;
  link: string;
  playlistId: string;
};

export default function Song() {


  return (
    <>
      <button className="text-start">
        <Paper className="flex w-full flex-col p-2" elevation={6}>
        </Paper>
      </button>
    </>
  );
}
