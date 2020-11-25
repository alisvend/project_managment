import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import Login from './components/login';
import Expense from './components/Expense';
import Register from './components/Register';
import axios from 'axios';
import Projects from './components/Projects';
const App = () => {
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
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">

            <li className="nav-item">
              <NavLink to='/projects' className="nav-link"><h4>Projects</h4></NavLink>
            </li>
            
            <li className="nav-item">
              {authLink}
            </li>
            <li className="nav-item">
              {regLink}
            </li>
          </ul>
        </div>
      </nav>
      <div className=" mt-5 pt-5" >
        <Switch>

          <Route path='/login' render={props => (
            <Login {...props} login={login} />
          )} />
          <Route path='/register' render={props => (
            <Register {...props} login={login} />
          )} />
          <Route path='/projects' render={props => (
            <Projects {...props} loggedIn={loggedIn} />
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
      </div>
    </Router>
  );
};

export default App;
