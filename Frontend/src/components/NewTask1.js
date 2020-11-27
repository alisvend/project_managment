import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import apiClient from '../services/api';

export default function NewTask1(props) {

    const [open, setOpen] = React.useState(false);
    const [taskName, setName] = React.useState();
    const [percentage, setPercentage] = React.useState();
    const [eid, setEid] = React.useState();
    const [employees, setEmployees] = React.useState();

    React.useEffect(() => {
       getEmployees();
       console.log(employees,"eee");
    }, []);
 const addTask = () => {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.get('sanctum/csrf-cookie')
                .then(() => apiClient.post('/api/addTask',
                    {
                        taskName: taskName,
                        percentage: percentage,
                        eid:eid,
                    })
               
                    .catch(error => console.error(error)
                    ))

        }
    }

    const getEmployees = () => {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.get('sanctum/csrf-cookie')
                .then(() => apiClient.get('/api/getEmployees').then(response => {
                    setEmployees( response.data )
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
      addTask();
    //   props.onAddProj();
      
  };
  return (
      <div>
            {/* <Button  onClick={handleClickOpen()} ></Button> */}
      <Button  onClick={handleClickOpen}>
        New Project
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
                     Start managing your project effectively
          </DialogContentText>
                  <TextField
                     
            autoFocus
            margin="dense"
            id="name"
            label="Project Name"
            type="text"
            fullWidth
          />
                  <TextField
                     
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
