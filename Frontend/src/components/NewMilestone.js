import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import apiClient from '../services/api';
export default function NewMilestone(props) {
    const [open, setOpen] = React.useState(false);
    const [milestoneName, setName] = React.useState();
    const [deadline, setDeadline] = React.useState();
    const [projectID, setProjectId] = React.useState(props.projectID);

    const addMilestone = () => {
        if (sessionStorage.getItem('loggedIn')) {
           apiClient.post('/api/addMile',
                    {
                        milestoneName: milestoneName,
                        deadline: deadline,
                        projectID: projectID
                    })

                    .catch(error => console.error(error)
                    )

        }
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setName(null);
        setDeadline(null);
    };
    const handleSubmit = () => {
        setOpen(false);
        addMilestone();
        props.onAddMile();
    };
    return (
        <div>

<button onClick={handleClickOpen} className="plus-blue radius " style={{color:"gray", marginRight: "1em",marginLeft: "1em", float: "right" }}>
            </button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Milestone</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Start managing your project effectively
          </DialogContentText>
                    <TextField
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Milestone Name"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        onChange={(e) => setDeadline(e.target.value)}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Deadline"
                        type="date"
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
