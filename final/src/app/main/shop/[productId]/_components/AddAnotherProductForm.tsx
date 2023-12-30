import * as React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

type Props = {
  open: boolean;
  onClose: () => void;
  productId: string;
};

export default function AddAnotherProdcutForm({
  open,
  onClose,
}: Props) {
  //   const [openStatus, setOpenStatus] = React.useState(open);
  //   const handleClose = () => {
  //     setOpenStatus(false);
  //   };
  const handleSubmit = () => {};

  return (
    <React.Fragment>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
