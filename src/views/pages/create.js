import React from 'react';
import state from '../../model/state'
import CreateForm from '../../components/comp-forms/createForm'

class Create extends React.Component{
    redirect = () =>{
        this.props.history.push("/index");
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

export default Create;