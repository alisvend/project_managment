import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import apiClient from '../services/api';
import EmployeeList from './EmployeeList';

export default function NewTask(props) {
    const [open, setOpen] = React.useState(false);
    const [taskName, setName] = React.useState();
    const [percentage, setPercentage] = React.useState();
    const [eid, setEid] = React.useState();
    const [employees, setEmployees] = React.useState([]);
    const [options, setOptions] = React.useState();
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
                        milestoneID:props.id,
                        user_id:eid,
                    })
               
                    .catch(error => console.error(error)
                    ))

        }
    }

    const getEmployees = () => {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.get('sanctum/csrf-cookie')
                .then(() => apiClient.get('/api/getEmployees')
                
                .then(response => {
                    setEmployees(response.data.data)
                })
               
                    .catch(error => console.error(error)
                    ))

        }
    }

  const handleClickOpen = () => {
    setOpen(true);
    getEmployees();
    console.log(employees,"eee");
    
      
   
  };

  const handleClose = () => {
      setOpen(false);
      setName(null);
      
  };

  const handleSubmit = () => {
      setOpen(false);
      addTask();
      props.onAddTask();
      
  };
  

  return (
      <div>
          {/* <button  onClick={handleClickOpen()} className="plus radius" style={{marginRight:"1em",float:"right"}}></button> */}
          <button  onClick={handleClickOpen} className="plus radius" style={{marginRight:"1em",float:"right"}}>
       
      </button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
                     Start managing your project effectively
          </DialogContentText>

          <EmployeeList onChangeEmployeeId={(id)=>{setEid(id)}} employees={employees} />

          {/* <Select onChange={(e)=>setEid(e.target.value)}> {employees.forEach((employee)=>{return(<option value={employee.id}>{employee.name} </option>);})}</Select>   */}
                  <TextField
                      onChange={(e)=>setName(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Task Name"
            type="text"
            fullWidth
          />

<TextField
                      onChange={(e)=>setPercentage(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Percentage"
            type="number"
            max={100}
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
