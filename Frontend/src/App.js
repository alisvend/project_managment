import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import Login from './components/login';

import Register from './components/Register';
import axios from 'axios';
import EmpSidebar from './components/EmpSidebar';
import Sidebar from './components/Sidebar';
const App = () => {
  const checkRole = () => {
    const role = sessionStorage.getItem('role');
    if (role === "admin") {
      
    }
  };


  const [loggedIn, setLoggedIn] = React.useState(
    sessionStorage.getItem('loggedIn') === 'true' || false
  );
  const login = () => {
    setLoggedIn(true);
    sessionStorage.setItem('loggedIn', true);
  };
  const logout = () => {
    axios.post('/logout').then(response => {
      if (response.status === 204) {
        setLoggedIn(false);
        sessionStorage.setItem('loggedIn', false);
        sessionStorage.setItem('role', null);
      }
    })
  };
  const authLink = loggedIn
    ? <button onClick={logout} className="nav-link btn btn-link navSplitReg"><h4>Logout</h4></button>

    : <NavLink to='/login' className="nav-link navSplitLog"><h4>Login</h4></NavLink>;
  const regLink = loggedIn
    ? <NavLink to='#' className="nav-link"></NavLink>
    
    : <NavLink to='/register' className="nav-link navSplitReg"><h4>Register</h4></NavLink>;
  return (
    
    <Router>
    
     
      <>
        <Switch>

        <Route exact path='/' render={props => (
            <Login {...props} login={login} />
          )} />
          <Route path='/login' render={props => (
            <Login {...props} login={login} />
          )} />
          <Route path='/register' render={props => (
            <Register {...props} login={login} />
          )} />
          <Route path='/adminView' render={props => (
            <Sidebar {...props} login={login}/>
          
          )} />
           <Route path='/employeeView' render={props => (
          <EmpSidebar {...props} login={login} />
           
          )} />
          {/* <Route path='/categories' render={props => (
            <Categories {...props} loggedIn={loggedIn} />
          )} />
          
          <Route path='/CategoryForm' render={props => (
            <CategoryForm {...props} loggedIn={loggedIn} />
          )} />
          <Route path='/editExpense' render={props => (
            <EditForm {...props} loggedIn={loggedIn} />
          )} /> */}
        </Switch>
      </>
    </Router>
  );
};

export default App;
