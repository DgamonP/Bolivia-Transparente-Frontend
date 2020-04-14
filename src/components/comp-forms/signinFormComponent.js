import React from 'react';
import state from '../../model/state'
import {signIn} from '../../api/graphql';
import SigninForm from './signinForm';

class SigninFormComponent extends React.Component{
    // constructor(props, context) {
    //     super(props, context);
    //     //do something...
    // }
    
    state = {
        warning : false,
        errorLogin : false,
        network : false,
        data : {
            email : "",
            password : ""
        }
    }

    handleChange = e =>{
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value,
            },
            warning : false,
            errorLogin : false,
            network : false,
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

                    var token = results.data.data.login.token
                    if(token){
                        state.token = token;
                        window.localStorage.setItem('token',token)
                        console.log("Login successful, new token is:");
                        console.log(token);
                        this.setState({warning:false, error:null});
                        this.props.redirect();
                    }
                }).catch(error=>{
                    console.log(error);
                    if(error === "Network Error"){          //TODO not working by now
                        console.log("Problema de comunicación");
                        this.setState({network:error, warning:false});
                    }else{                          // by now: Request failed with status code 500
                        console.log("Login error");
                        this.setState({errorLogin:true, warning:false});
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
                    login       = {this.login}
                    onChange    = {this.handleChange}
                />);
    }
}

export default SigninFormComponent;