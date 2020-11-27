import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const EmpRegister = (props) => {
    const [redirect, setRedirect] = React.useState(true);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [password_confirmation, setConfirmPassword] = React.useState('');
    const [managerId, setManagerId] = React.useState(sessionStorage.getItem('userId'));
    const role = sessionStorage.getItem('role');
    // const [authError, setAuthError] = React.useState(false);
    // const [unknownError, setUnknownError] = React.useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (role === 'admin') {
            
            // setAuthError(false);
            // setUnknownError(false);
            axios.get('/sanctum/csrf-cookie')
                .then(response => {
                    axios.post('api/regEmp', {
                        name: name,
                        email: email,
                        password: password,
                        password_confirmation: password_confirmation,
                        role: 'employee',
                        manager_id: managerId
                    }).then(response => {
                        if (response.status === 201) {
                            setName("");
                            setPassword("");
                            setEmail("");
                            setConfirmPassword("");
                        }
                    }).catch(error => console.error(error));
                });

       
        } else {
            console.log(redirect);
            setRedirect(false);
            console.log(redirect,"after");
        }
    }
    // if (toHome === true) {
    //     return <Redirect to='/projects' />
    // }

    if (role==="admin") {
        return (
        
            <div>
                <h3>Register</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                        
                            type="text"
                            name="name"
                            className={"form-control" } //+ (authError || unknownError ? ' is-invalid' : '')
                            placeholder="Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                        
                            type="email"
                            name="email"
                            className={"form-control" } //+ (authError || unknownError ? ' is-invalid' : '')
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            className={"form-control" }
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password_confirmation"
                            className={"form-control"}
                            placeholder="Password"
                            value={password_confirmation}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                
                   
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        );
    }else{return <div>YOU ARE NOT ALLOWED TO ENTER HERE</div>}
};

export default EmpRegister;