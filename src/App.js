import React,  { useState, useEffect } from "react";
//import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss";
import "assets/demo/demo.css";
// pages
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Index from "views/Index.js";
//import LoginPage from "views/pages/LoginPage.js";
// others pages alvaro
import AnonymousDenuncia from './views/pages/anonymousDenuncia';
import OfficialDenuncia from './views/pages/officialDenuncia';
import MyDenuncias from './views/pages/myDenuncias';
import ViewDenuncias from './views/pages/viewDenuncias';
import SignUpPage from './views/pages/signupPage';
import SignInPage from './views/pages/signinPage';
import AuthContext from './context/auth-context';

const App = () => { 
  const [token, setToken] = useState(window.localStorage.getItem('token'))

  useEffect(()=> {
    console.log("TOKEN BEFERO", token)
    setToken(window.localStorage.getItem('token'))
    console.log("TOKEN AFTER", token)
  },)

  const logout = () => {
    window.localStorage.setItem("token", null)
  };

  return (
  <BrowserRouter>
      <AuthContext.Provider
        value={{ logout, token }}>
        <React.Fragment>
        <IndexNavbar />
          <Switch>
              {console.log("TOKEN EXIST?", token)}              
              {(token === "null") && (<Redirect from="/myDenuncias" to="/" /> )}
              {(token === "null") && (<Redirect from="/createDenuncia" to="/" /> )}
                <Route  path="/" exact component={Index} />
                <Route  path="/signup" exact component = {SignUpPage}/>
                <Route  path="/signin" exact component = {SignInPage}/>
                <Route  path="/viewDenuncias" exact component = {ViewDenuncias}/>
                <Route  path="/anonymousDenuncia" exact component = {AnonymousDenuncia}/>
              {(token !== "null") && <Route  path="/officialDenuncia" exact component = {OfficialDenuncia}/>}
              {(token !== "null") && <Route  path="/myDenuncias" exact component = {MyDenuncias}/>}               
                <Route path = "/" render={() => <h1>404</h1>}/>
            </Switch>
          </React.Fragment>
      </AuthContext.Provider>
  </BrowserRouter>);
}

export default App;