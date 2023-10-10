import MusicIcon from "@mui/icons-material/MusicNote";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function HeaderBar() {
  return (
    <AppBar position="static" sx={{p: 1}}>
      <Toolbar>
        <IconButton
          size="medium"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MusicIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, letterSpacing: 1 }}>
          WP Music
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
