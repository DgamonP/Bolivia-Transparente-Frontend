import React from 'react';
import IndexNavbar from "../../components/Navbars/IndexNavbar.js";

class NotFound extends React.Component{
    render(){
        return(
            <React.Fragment>
                <IndexNavbar />
                <div className="init-container">
                    <p>Página no encontrada</p>
                </div>
            </React.Fragment>
        )
    };
}

export default NotFound;