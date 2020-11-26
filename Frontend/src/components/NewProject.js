import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import apiClient from '../services/api';
export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [projectName, setName] = React.useState();
    const [deadline, setDeadline] = React.useState();

    const addProject = () => {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.get('sanctum/csrf-cookie')
                .then(() => apiClient.post('/api/addProject',
                    {
                        projectName: projectName,
                        deadline: deadline
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
      setName(null);
      setDeadline(null);
  };
  const handleSubmit = () => {
      setOpen(false);
      addProject();
      props.onAddProj();
      
  };
  return (
      <div>
           <a className="nav-link collapsed" onClick={handleClickOpen} data-toggle="collapse" data-target="#collapseUtilities"
                                aria-expanded="true" aria-controls="collapseUtilities">
                                <i className="fas fa-fw fa-wrench"></i>
                                <span> New Project</span>
                            </a>
                            <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                                data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <h6 className="collapse-header">Custom Utilities:</h6>
                                    <a className="collapse-item" href="utilities-color.html">Colors</a>
                                    <a className="collapse-item" href="utilities-border.html">Borders</a>
                                    <a className="collapse-item" href="utilities-animation.html">Animations</a>
                                    <a className="collapse-item" href="utilities-other.html">Other</a>
                                </div>
                            </div>
      {/* <Button  onClick={handleClickOpen}>
        New Project
      </Button> */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
                     Start managing your project effectively
          </DialogContentText>
                  <TextField
                      onChange={(e)=>setName(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Project Name"
            type="text"
            fullWidth
          />
                  <TextField
                      onChange={(e)=>setDeadline(e.target.value)}
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
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
