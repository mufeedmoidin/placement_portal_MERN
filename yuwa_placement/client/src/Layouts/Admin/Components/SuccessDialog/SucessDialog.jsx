import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useContext } from "react";
import { AdContext } from "../../Context/AdminContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box } from "@mui/material";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function SucessDialog({
  title,
  message,
  openState,
  closeState,
}) {
  return (
    <div>
      <Dialog
        open={openState}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeState}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box sx={{ padding: 5 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "red",
              height: "10vh",
              p: 5,
            }}
          >
            <CheckCircleIcon
              color="success"
              sx={{ fontSize: "100px", mt: 2 }}
            />
          </Box>
          <DialogTitle align="center">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {message}
            </DialogContentText>
          </DialogContent>
        </Box>
      </Dialog>
    </div>
  );
}
