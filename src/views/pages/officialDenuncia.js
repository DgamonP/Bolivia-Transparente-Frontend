import React, { useState, useEffect } from "react";
//import state from '../../model/state'
import CreateForm from "../../components/comp-forms/createForm";
import AuthContext from "../../context/auth-context";

const OfficialDenuncia = () => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  return (
    <AuthContext.Provider value={{ token }}>
      <React.Fragment>
        <div
            className="page-header"
            style={{
            backgroundImage:
              "url(" + require("assets/img/backgroundForm.png") + ")",
            }}
        >
        <CreateForm /* redirect={redirect} */ />
        </div>
      </React.Fragment>
    </AuthContext.Provider>
  );
};

/* class Create extends React.Component{
    redirect = () =>{
        this.props.history.push("/");
    }

    goToLogin = () =>{
        this.props.history.push("/signin");
    }

    render(){
        if(state.token===""){
            this.goToLogin();
        }
        return (
            <React.Fragment>
                <CreateForm redirect={this.redirect}/>  
            </React.Fragment>
        );
    }
}
*/
export default OfficialDenuncia;
