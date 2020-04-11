import React from 'react';
import './styles/button.css';
import Button from '@material-ui/core/Button';
import noViolencia from '../../images/noviolencia.jpeg';
import SigninFormComponent from '../../components/comp-forms/signinFormComponent';

class SignInPage extends React.Component{
    redirect = () =>{
        this.props.history.push("/create");
    }
    
    redirectToSignup = ()=>{
        this.props.history.push("/signup");
    }

    render(){
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-6" align="center">
                            <img style={{padding: 20}} className="Navbar__brand-logo" src={noViolencia} alt="Llamado a no violencia" width="100%"/>
                            <div className="Badges__container">
                            <Button style={{padding: 24}} type="button" onClick={this.redirectToSignup} size="small" color="primary" target="_blank">
                                Registrarse
                            </Button>
                                {/* <div className="Badges__buttons">
                                    <Link to="/signup" className="btn btn-primary">
                                        
                                    </Link>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-6">
                            <SigninFormComponent
                                onChange = {this.handleChange}
                                redirect = {this.redirect}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignInPage;