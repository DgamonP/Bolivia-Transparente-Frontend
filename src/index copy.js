import React, {useState} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss";
import "assets/demo/demo.css";
// pages
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import LandingPage from "views/pages/LandingPage.js";
import ProfilePage from "views/pages/ProfilePage.js";
import LoginPage from "views/pages/LoginPage.js";
// others pages alvaro
import Create from './views/pages/createDenuncia';
import SignInPage from './views/pages/signinPage';
import AuthContext from './context/auth-context';

//function auxiliares
/* const [token, setToken]=useState("null")

componentDidMount() {
  const token = window.localStorage.getItem('token')
  console.log('cargado en la memoria', token)
  setToken({
    token: token,
  });
};

logout = () => {
  window.localStorage.setItem("token", null)
  setToken({
        token: null,
  });
}; */



ReactDOM.render(
  <BrowserRouter>
    <AuthContext.Provider
        value={{
                /* token: this.state.token,
                logout: this.logout */
              }}>
        <Switch>
          <Route exact path="/signin" component = {SignInPage}/>
          <Route exact path="/create" component = {Create}/>

          <Route path="/index" render={props => <Index {...props} />} />
          <Route
            path="/nucleo-icons"
            render={props => <NucleoIcons {...props} />}
          />
          <Route
            path="/landing-page"
            render={props => <LandingPage {...props} />}
          />
          <Route
            path="/profile-page"
            render={props => <ProfilePage {...props} />}
          />
          <Route
            path="/login-page"
            render={props => <LoginPage {...props} />}
          />
          <Redirect to="/index" />
        </Switch>
    </AuthContext.Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
