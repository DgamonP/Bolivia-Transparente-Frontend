import React from 'react';
import "./styles/pages.css";

class SuccessPage extends React.Component{
    state = {
        incomeFolio: undefined,
    }

    componentDidMount(){
        let auxiliarFolio = window.localStorage.getItem("folio");
        console.log("Setting to folio", auxiliarFolio);
        this.setState({incomeFolio: auxiliarFolio});
        window.localStorage.removeItem("folio");
    }

    render(){
        console.log("Building for folio", this.state.incomeFolio);
        
        if(this.state.incomeFolio){
            return (
                <div className ="init-container">
                    <div className="centered-container">
                        <h1 className="init-item"> Denuncia registrada con éxito</h1>
                        <h5 className="init-item"> El código de su denuncia es {this.state.incomeFolio}, recuerde este código para hacer futuras consultas</h5>
                    </div>
                </div>);
        }
        else{
            return (
                <div className ="init-container">
                    <div className="centered-container">
                        <h1 className="init-item"> Denuncia no enviada </h1>
                    </div>
                </div>);
        }
        
    }
}

export default SuccessPage;