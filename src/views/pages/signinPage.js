import React from 'react';
import "./styles/pages.css"
import Button from '@material-ui/core/Button';
import IndexNavbar from "../../components/Navbars/IndexNavbar.js";
import SigninFormComponent from '../../components/comp-forms/signinFormComponent';

class SignInPage extends React.Component{
    redirect = () =>{
        this.props.history.push("/denunciar");
    }
    
    redirectToSignup = ()=>{
        this.props.history.push("/registro");
    }

    render(){
        return(
            <React.Fragment>
            <IndexNavbar />
                <div className="init-container">
                    <div className="init-item-background-2">
                        <Button style={{padding: 24}} type="button" onClick={this.redirectToSignup} size="small" variant="contained" target="_blank">
                            Registrarse
                        </Button>
                    </div>
                    <div className="init-item">
                        <SigninFormComponent
                            onChange = {this.handleChange}
                            redirect = {this.redirect}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default SignInPage;