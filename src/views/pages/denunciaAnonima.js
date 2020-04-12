import React, {useState, useEffect} from 'react';

import CreateForm from '../../components/comp-forms/createForm'
//import AuthContext from './context/auth-context';

const DenunciaAnonima = () => {
    const [token, setToken] = useState(null)

      useEffect(()=> {
        console.log("TOKEN BEFERO", token)
        setToken(window.localStorage.getItem('token'))
        console.log("TOKEN AFTER", token)
        })

        var redirect = () => {
        if (token === 'null'){
            window.location.href='/singin';
            } 
            else {
            console.log(token);
            window.location.href='/'
            }    
        }
    

    return(        
        <React.Fragment>
          <h1>Quieres efectuar una denuncia anonima??</h1>
            <CreateForm redirect={redirect}/>  
        </React.Fragment>
    )
}

export default DenunciaAnonima;