import React from "react";
import denuncia from "../../images/denuncia.jpeg";
import SignupForm from "../../components/comp-forms/signupForm";
import Button from "@material-ui/core/Button";

class SignUpPage extends React.Component {
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

  redirect = () => {
    this.props.history.push("/CreateDenuncia");
  };

  redirectToSignin = () => {
    this.props.history.push("/signin");
  };

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
            {/* <div className="BadgeNew__hero">
                        <img className="Navbar__brand-logo" src={logo} alt="Ministerio de Gobierno" height="160"/>
                    </div> */}
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
                </div>
                <div className="col-6">
                  <SignupForm
                    onChange={this.handleChange}
                    redirect={this.redirect}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SignUpPage;
