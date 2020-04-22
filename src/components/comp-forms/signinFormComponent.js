import React from 'react';
import state from '../../model/state'
import {signIn} from '../../api/graphql';
import SigninForm from './signinForm';

class SigninFormComponent extends React.Component{
    state = {
        warning         : false,
        errorLogin      : false,
        network         : false,
        passwordError   : false,
        data : {
            email : "",
            password : ""
        }
    }
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

    handleChange = e =>{
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value,
            },
            warning         : false,
            errorLogin      : false,
            network         : false,
            passwordError   : false
        });
    }

    login = async e => {
        if(this.state.data.email === "" || this.state.data.password === ""){
            console.log("Empty fields");
            this.setState({warning:true});
        }
        else{
            signIn(this.state.data.email,this.state.data.password)
                .then(results=>{
                    console.log("Signin results:");
                    console.log(results);

                    var token = results.token
                    if(token){
                        state.token = token;
                        window.localStorage.setItem('token',token);
                        console.log("Saving user Id:",results.userId);
                        window.localStorage.setItem('id', results.userId);
                        console.log("Login successful, new token is:");
                        console.log(token);
                        this.setState({warning:false, error: null});
                        window.location.href='/';
                    }
                }).catch(error=>{
                    console.log("Message: ", error.message);
                    if(error.message === "NetworkError when attempting to fetch resource."){
                        console.log("Problema de comunicación");
                        this.setState({network: error, warning: false});
                    }
                    else{                         // by now: Request failed with status code 500
                        if(error.message==="The provided EMAIL does not exist!"){
                            console.log("Login error");
                            this.setState({errorLogin: true, warning: false});
                        }
                        else{
                            if(error.message==="Incorrect Password!"){
                                console.log("Passowrd error");
                                this.setState({passwordError: true, warning: false});
                            }
                        }
                    }
                });
        }
    }

    render(){
        return (<SigninForm
                    vars        = {this.state.data}
                    warning     = {this.state.warning}
                    errorLogin  = {this.state.errorLogin}
                    network     = {this.state.network}
                    password    = {this.state.passwordError}
                    login       = {this.login}
                    onChange    = {this.handleChange}
                />);
    }
}

export default SigninFormComponent;