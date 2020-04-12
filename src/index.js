import React,  {useState, useEffect} from "react";
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
import DenunciaAnonima from "views/pages/denunciaAnonima.js";
// others pages alvaro
import Create from './views/pages/create';
import SignInPage from './views/pages/signinPage';
import AuthContext from './context/auth-context';

const Home  = () => {
  const [token, setToken] = useState("")

  useEffect(()=> {
    console.log("TOKEN BEFERO", token)
    setToken(window.localStorage.getItem('token'))
    console.log("TOKEN AFTER", token)
  })

  const logout = () => {
    window.localStorage.setItem("token", null)
  };

    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{ logout, token }}>
            <main className="main-content">
              <Switch>
              <Route exact path="/" render={props => <Index {...props} />} />
              <Route exact path="/signin" component = {SignInPage}/>
              <Route exact path="/anonima" component = {DenunciaAnonima}/>
              {/* <Route exact path="/create" component = {Create}/> */}
              <Route
                 path="/login-page"
                 render={props => <LoginPage {...props} />}
                />
                <Route
                 path="/landing-page"
                 render={props => <LandingPage {...props} />}
                />
              {/* <Route exact path="/" component = {HomePage}/>
              <Route exact path="/signin" component = {SignInPage}/> */}  
                {/* {!this.state.token && <Redirect from="/appPrivate" to="/init" exact />} */}
               {/*  {this.state.token && (
                  <Route exact path="/" component = {HomePage}/> 
                )} */}
                {/* {this.state.token && (
                  <Route exact path="/signin" component = {SignInPage}/> 
                )} */}
                {/* {this.state.token && (
                  <Route path="/privatehome" component={privateHome} />
                )}
                {this.state.token && (
                  <Route exact path="/init"   component = {InitPage}/> 
                )} */}
               {!token && (
                  <Route exact path="/create" component = {Create}/> 
                )} 
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  
}
ReactDOM.render(<Home />, document.getElementById('root'));

