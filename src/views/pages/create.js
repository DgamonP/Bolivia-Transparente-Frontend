import React from 'react';
// import state from '../model/state'
import CreateForm from '../../components/comp-forms/createForm'
import IndexNavbar from "../../components/Navbars/IndexNavbar.js";


class Create extends React.Component{
    redirect = () =>{
        this.props.history.push("/exito");
    }

    goToLogin = () =>{
        this.props.history.push("/ingreso");
    }

    render(){
        // if(state.token===""){
        //     this.goToLogin();
        // }
        return (
            <React.Fragment>
               {/*  <IndexNavbar /> */}
                <div >
                    <CreateForm redirect={this.redirect}/>  
                </div>
            </React.Fragment>
        );
    }
}

export default Create;