import React from 'react';
// import state from '../model/state'
import CreateForm from '../../components/comp-forms/createForm'
import IndexNavbar from "../../components/Navbars/IndexNavbar.js";

class Create extends React.Component{
    redirect = () =>{
        this.props.history.push("/inicio");
    }

    goToLogin = () =>{
        this.props.history.push("/ingreso");
    }

    render(){
        // if(state.token===""){
        //     this.goToLogin();
        // }
        console.log("Props:", this.props.match.params.id);
        return (
            <React.Fragment>
                <IndexNavbar />
                <div className="init-container">
                    <CreateForm display={this.props.match.params.id} redirect={this.redirect}/>  
                </div>
            </React.Fragment>
        );
    }
}

export default Create;