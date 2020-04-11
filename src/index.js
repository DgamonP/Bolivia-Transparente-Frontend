import React,  {useState, Component} from "react";
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
import Create from './views/pages/create';
import SignInPage from './views/pages/signinPage';
import AuthContext from './context/auth-context';

class Home extends Component {
  state = {
  token: null,
  };

  componentDidMount() {
    const token = window.localStorage.getItem('token')
    console.log('cargado en la memoria', token)
      this.setState({
        token: token,
      });
  }


  logout = () => {
    window.localStorage.setItem("token", null)
    this.setState({
        token: null,
    }); 
  };

  render(){
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
            }}>
            <main className="main-content">
              <Switch>
              <Route path="/index" render={props => <Index {...props} />} />
              <Route exact path="/signin" component = {SignInPage}/>
              <Route
                 path="/login-page"
                 render={props => <LoginPage {...props} />}
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
                {this.state.token && (
                  <Route exact path="/create" component = {Create}/> 
                )}
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
ReactDOM.render(<Home />, document.getElementById('root'));

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


/* ReactDOM.render(
  <BrowserRouter>
    <AuthContext.Provider
        value={{
                token: this.state.token,
                logout: this.logout
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
); */
