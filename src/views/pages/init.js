import React from 'react';
import "./styles/pages.css";
import Button from '@material-ui/core/Button';
import IndexNavbar from "../../components/Navbars/IndexNavbar.js";

class InitPage extends React.Component{
    state = {
        form: {
            email: "",
            password: "",
        } 
    };
    handleChange = e =>{
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            }
        });
    }

    redirect = ()=>{
        this.props.history.push("/denunciar");
    }
    
    redirectToSystem = ()=>{
        this.props.history.push("/registro");
    }

    render(){
        return(
            <React.Fragment>
                <IndexNavbar />
                <div className="init-container">
                    <div className="init-item">
                        <h1 style={{paddingRight: 24, paddingLeft: 24}}>Plataforma de denuncias ciudadanas</h1>
                        <p style={{paddingRight: 24, paddingLeft: 24}}>A través de nuestra plataforma web y android el Gobienro y el ciudadano núnca habian estado más juntos. A través de este sistema se proporciona un sistema de realización de denuncias ciudadanas <br/>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                    <div className="init-item-background">
                        <Button style={{padding: 24}} type="button" onClick={this.redirectToSystem} size="small" variant="contained" target="_blank">
                            Ingresar al sistema
                        </Button>
                        {/* <div className="Badges__buttons">
                            <Link to="/signup" className="btn btn-primary">
                                
                            </Link>
                        </div> */}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default InitPage;