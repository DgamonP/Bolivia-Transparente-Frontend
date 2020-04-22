import React from "react";
//import "./styles/pages.css";
import SigninFormComponent from "../../components/comp-forms/signinFormComponent";

class SignInPage extends React.Component {
    
  componentDidMount (){
    this.init();
    console.log("init exect");
    this.clean();
    console.log("clean exect");
  }
  
  init = () => {
    document.documentElement.classList.remove("nav-open");
    console.log('borrar nav-open');
  }; 

  clean = () => {
    document.body.classList.add("register-page");
    console.log("add register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
      console.log("remove register-page");
    };  
  };  
  /* 
  componentWillMount (){
    this.init();      
  } */
  
  redirect = () => {
    this.props.history.push("/denunciar");
  };

  redirectToSignup = () => {
    this.props.history.push("/registro");
  };
  
  render() {
    return (
       <div onChange = {this.init}> 
          <SigninFormComponent
            onChange={this.handleChange}
            redirect={this.redirect}
          />
        </div>    
    );
  }
}

export default SignInPage;
