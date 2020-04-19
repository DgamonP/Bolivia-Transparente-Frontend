import React,  {useState, useEffect} from "react";
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

// styles
import "assets/demo/demo.css";
import "assets/scss/paper-kit.scss";
import "assets/css/bootstrap.min.css";

// pages
// import LandingPage from "views/pages/LandingPage.js";
// import LandingPage from "views/pages/LandingPage";
// import LoginPage from "views/pages/LoginPage.js";
import Index from "views/Index.js";
import InitPage from './views/pages/init';
import Create from './views/pages/create';
import NotFound from './views/pages/notFound';
import AuthContext from './context/auth-context';
import Footer from './components/Footers/footer';
import SearchPage from './views/pages/searchPage';
import SignUpPage from './views/pages/signupPage';
import SignInPage from './views/pages/signinPage';
import MyDenuncias from './views/pages/myDenuncias';
import IndexNavbar from "components/Navbars/IndexNavbar.js";

const App = () => { 
  const [token, setToken] = useState(window.localStorage.getItem('token'))

  useEffect(()=> {
    console.log("TOKEN BEFORE", token);
    setToken(window.localStorage.getItem('token'));
    console.log("TOKEN AFTER", token);
  },)

  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("id");
  };

  return (
  <BrowserRouter>
    <AuthContext.Provider
      value={{ logout, token }}>
      <React.Fragment>
        <IndexNavbar />
        <Switch>
            {console.log("TOKEN EXIST?", token)}              
            {(token === null) && (<Redirect from="/myDenuncias" to="/" /> )}
            {(token === null) && (<Redirect from="/createDenuncia" to="/" /> )}
              <Route exact path = "/"                   component={Index} />
              {/* <Route  path="/signup" exact component = {SignUpPage}/>
              <Route  path="/signin" exact component = {SignInPage}/> */}
              <Route exact path = "/inicio"             component = {InitPage}/>
              <Route exact path = "/ingreso"            component = {SignInPage}/>
              <Route exact path = "/registro"           component = {SignUpPage}/>
              <Route exact path = "/denunciar"          component = {Create}/>
              <Route exact path = "/ver/:id"            component = {Create}/>
              <Route exact path = "/buscar"             component = {SearchPage}/>
              <Route exact path = "*"                   component = {NotFound}/>
            {(token !== null) && <Route exact path="/myDenuncias" component = {MyDenuncias}/>}               
              <Route path = "/" render={() => <h1>404</h1>}/>
        </Switch>
        <Footer/>

      </React.Fragment>
    </AuthContext.Provider>
  </BrowserRouter>);
}

export default App;