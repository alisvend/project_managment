import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';

import Login from './components/login';
import axios from 'axios';

const App=()=> {
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
      }
    })
  };
  const authLink = loggedIn 
    ? <button onClick={logout} className="nav-link btn btn-link navSplitReg"><h4>Logout</h4></button> 
    : <NavLink to='/login' className="nav-link navSplitLog"><h4>Login</h4></NavLink>;
  
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">
          <li className="nav-item">
            {authLink}
          </li>
        </ul>
        </div>
      </nav>
      <div className=" mt-5 pt-5" >
        <Switch>
          
          <Route path='/login' render={props => (
            <Login {...props} login={login} />
          )} />
        
        </Switch>
      </div>
    </Router>
  );
}

export default App;
