import React,  {useState, useEffect} from "react";
//import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss";
import "assets/demo/demo.css";
// pages
import Index from "views/Index.js";
//import LandingPage from "views/pages/LandingPage.js";
import InitPage from "views/pages/init.js";
import LandingPage from "views/pages/LandingPage";
import LoginPage from "views/pages/LoginPage.js";
import DenunciaAnonima from "views/pages/denunciaAnonima.js";
// others pages alvaro
import CreateDenuncia from './views/pages/createDenuncia';
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
  },[])

  const logout = () => {
    window.localStorage.setItem("token", null)
  };

  return (
  <BrowserRouter>
      <AuthContext.Provider
        value={{ logout, token }}>
        <React.Fragment>
          <Switch>
              {console.log("TOKEN EXIST?", token)}
              {(token === "null") && (<Redirect from="/crearteDenuncia" to="/" /> )}
              {(token === "null") && (<Redirect from="/myDenuncias" to="/" /> )}
                <Route  path="/" exact component={Index} />
                <Route  path="/viewDenuncias" exact component = {ViewDenuncias}/>
                <Route  path="/signin" exact component = {SignInPage}/>            
                <Route  path="/singup" exact component = {SignUpPage}/>               
              {(token !== "null") && <Route  path="/createDenuncia" exact component = {CreateDenuncia}/>}
              {(token !== "null") && <Route  path="/myDenuncias" exact component = {MyDenuncias}/>}                
                <Route path = "/" render={() => <h1>404</h1>}/>
            </Switch>
          </React.Fragment>
      </AuthContext.Provider>
  </BrowserRouter>);
}

export default App;