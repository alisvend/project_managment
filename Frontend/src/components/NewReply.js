import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import apiClient from '../services/api';
export default function NewReply(props) {
    const [open, setOpen] = React.useState(false);
   
    const [content, setContent] = React.useState();
   
 const addReply = () => {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.get('sanctum/csrf-cookie')
                .then(() => apiClient.post('/api/addReply',
                    {
                        issueID:props.id,
                        reply: content,
                    })
                    .catch(error => console.error(error)
                    ))
        }
    }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
      setOpen(false);
  };
  const handleSubmit = () => {
      setOpen(false);
      addReply();
      props.onAddReply();
  };
  return (
      <div>
            {/* <Button  onClick={handleClickOpen()} ></Button> */}
      <button  className="btn btn-light btn-icon-split"onClick={handleClickOpen}>
       <span className="text">Add Reply</span> 
      </button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Reply</DialogTitle>
        <DialogContent>
          <DialogContentText>
                     Share your reply and help others :)
          </DialogContentText>
                  
                  <TextField
            onChange={(e) => { setContent(e.target.value) }}
            autoFocus
            margin="dense"
            id="name"
            label="State your Reply"
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