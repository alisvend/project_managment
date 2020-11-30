import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import apiClient from "../services/api";
export default function NewIssue(props) {
  const [open, setOpen] = React.useState(false);
  const [issueTitle, setTitle] = React.useState();
  const [content, setContent] = React.useState();

  const addIssue = () => {
    if (sessionStorage.getItem("loggedIn")) {
     
        apiClient
          .post("/api/addIssue", {
            title: issueTitle,
            issue: content,
          })
          .catch((error) => console.error(error))
      
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    setOpen(false);
    addIssue();
    props.onAddIssue();
  };
  return (
    <div>
      
      <button className="btn btn-info btn-icon-split issue-new" onClick={handleClickOpen}><span className="text">New Issue</span></button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Issue</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Share your issue and get other's solutions :)
          </DialogContentText>
          <TextField
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            autoFocus
            margin="dense"
            id="name"
            label="Issue Title"
            type="text"
            fullWidth
          />
          <TextField
            onChange={(e) => {
              setContent(e.target.value);
            }}
            autoFocus
            margin="dense"
            id="name"
            label="State your Issue"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
