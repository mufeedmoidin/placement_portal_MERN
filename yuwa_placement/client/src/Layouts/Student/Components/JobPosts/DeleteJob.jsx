import * as React from "react";
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
import SucessDialog from "../SuccessDialog/SucessDialog";
import { useState } from "react";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteJob({
  openDeleteDialog,
  setOpenDeleteDialog,
  data,
}) {
  const { deletePost, success, setSuccess, handleCloseSuccess } =
    useContext(AdContext);
  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };
  const handleDeletePost = async (data) => {
    deletePost(data);
    await setOpenDeleteDialog(false);
    await setSuccess(true);
    await handleCloseSuccess();
  };

  return (
    <React.Fragment>
      <Dialog
        open={openDeleteDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDeleteDialogClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Attempting to delete!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="error">
            Cancel
          </Button>
          <Button onClick={() => handleDeletePost(data)}>Yes, Delete</Button>
        </DialogActions>
      </Dialog>
      <SucessDialog
        title="Post deleted!"
        message="Post deleted successfully!"
        openState={success}
        closeState={handleCloseSuccess}
      />
    </React.Fragment>
  );
}
