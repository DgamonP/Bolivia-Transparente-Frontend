import React from 'react';
import "./styles/pages.css"
import SignupForm from '../../components/comp-forms/signupForm';
import Button from '@material-ui/core/Button';

class SignUpPage extends React.Component{
    

    // componentDidMount(){
    //     this.fetchData()
    // }

    // fetchData = async () =>{
    //     this.setState({loading:true, error:null});

    //     try{
    //         const data = undefined;
    //         this.setState({loading:false, data:data});
    //     }
    //     catch(error){
    //         this.setState({loading:false, error:error});
    //     }
    // }

    redirect = ()=>{
        this.props.history.push("/denunciar");
    }

    redirectToSignin = ()=>{
        this.props.history.push("/ingreso");
    }
    
    render(){
        return(
            <React.Fragment>
                {/* <div className="BadgeNew__hero">
                    <img className="Navbar__brand-logo" src={logo} alt="Ministerio de Gobierno" height="160"/>
                </div> */}
                <div className="init-container">
                    {/* <div className="init-item-background-3">
                        <Button style={{padding: 24}} type="button" onClick={this.redirectToSignin} size="small" variant="contained" target="_blank">
                            Ingresar
                        </Button>
                    </div> */}
                    <div className="init-item">
                        <SignupForm
                            onChange = {this.handleChange}
                            redirect = {this.redirect}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default SignUpPage;