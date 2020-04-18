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

<<<<<<< HEAD
  render() {
    return (
      <React.Fragment>
        <div
          className="page-header"
          style={{
            backgroundImage:
              "url(" + require("assets/img/backgroundForm.png") + ")",
          }}
        >
          <div>
            <div className="container">
              <div className="row">
                <div className="col-6" align="center">
                  <img
                    style={{ padding: 20 }}
                    className="Navbar__brand-logo"
                    src={denuncia}
                    alt="Llamado a no violencia"
                    width="100%"
                  />
                  <div className="Badges__container">
                    <Button
                      style={{ padding: 24 }}
                      type="button"
                      onClick={this.redirectToSignin}
                      size="small"
                      color="primary"
                      target="_blank"
                    >
                      Ingresar
                    </Button>
                  </div>
=======
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
                    <div className="init-item-background-3">
                        <Button style={{padding: 24}} type="button" onClick={this.redirectToSignin} size="small" variant="contained" target="_blank">
                            Ingresar
                        </Button>
                    </div>
                    <div className="init-item">
                        <SignupForm
                            onChange = {this.handleChange}
                            redirect = {this.redirect}/>
                    </div>
>>>>>>> e69511dc3698969ae32ee2c073f6e444adc637ae
                </div>
            </React.Fragment>
        );
    }
}

export default SignUpPage;