import React from 'react';
import "./styles/pages.css"
import SignupForm from '../../components/comp-forms/signupForm';
import Button from '@material-ui/core/Button';

class SignUpPage extends React.Component{
    redirect = ()=>{
        this.props.history.push("/denunciar");
    }

    redirectToSignin = ()=>{
        this.props.history.push("/ingreso");
    }
    
    render(){
        return(
            <React.Fragment>
                <div>
                    <SignupForm
                        onChange = {this.handleChange}
                        redirect = {this.redirect}/>
                </div>
            </React.Fragment>
        );
    }
}

export default SignUpPage;