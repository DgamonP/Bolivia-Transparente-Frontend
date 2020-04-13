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
import Create from './views/pages/create';
import SignInPage from './views/pages/signinPage';
import AuthContext from './context/auth-context';

const PrivateRoute = ({ component: Component, token, ...rest }) => {
  return (
    <Route {...rest} render={(props) => {
  
      if (token !== "null"){
        return <Component {...props} />
      }

      return <Redirect to='/' /> 
      
    }
    }/>
  )
}




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

                {(token === "null") && (<Redirect from="/init" to="/" /> )}

                <Route  path="/" exact component={Index} />
                <Route  path="/signin" exact component = {SignInPage}/>
                <Route  path="/create" exact component = {Create}/>
                <Route  path="/landing" exact component = {LandingPage}/>

                {/* <PrivateRoute path="/init" token={token} component={InitPage} /> */}
                {(token !== "null") && <Route  path="/init" exact component = {InitPage}/>}

                
                <Route path = "/" render={() => <h1>404</h1>}/>

            </Switch>
          </React.Fragment>

      </AuthContext.Provider>
  </BrowserRouter>);
}

export default App;