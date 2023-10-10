import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

export type ALertDialogProps =
{
    open: boolean;
    onClose: () => void;
    content: string;
}

export function AlertDialog({open, onClose, content}: ALertDialogProps)
{
    return(
        <Dialog open={open} onClose={onClose}>
            <DialogTitle><ReportProblemIcon sx={{mr:1}}/>Oops, Something is wrong!</DialogTitle>
            <DialogContent>{content}</DialogContent>
            <DialogActions>
                <Button onClick={onClose}>sure</Button>
            </DialogActions>
        </Dialog>
    )
}