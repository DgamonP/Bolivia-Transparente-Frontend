import React, {useState, useEffect} from 'react';
//import state from '../../model/state'
import CreateForm from '../../components/comp-forms/createForm'
//import AuthContext from './context/auth-context';

const Create = () => {
   /*  const [token, setToken] = useState("")
    
      useEffect(() => {
        console.log("TOKEN en create", token)
        setToken(window.localStorage.getItem('token'))
        console.log("TOKEN despues de crate", token)
        },);

        var redirect = () => {
            if (token === 'null'){
                /* useEffect()  
                //window.location.href='/singin';
                } 
                else {
                console.log(token);
                //window.location.href='/'
                }
        } */
        const redirect = () =>{
            window.location.href='/';
        }

    return(
        <React.Fragment>
            <CreateForm /* redirect={redirect} *//>  
        </React.Fragment>
    )
}

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
export default Create; 