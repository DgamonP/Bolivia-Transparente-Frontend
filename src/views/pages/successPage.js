import React from 'react';
//import { Success } from './assets/img/success.png';
import success from "../../assets/img/success.png";
import error from "../../assets/img/error.png";

import "./styles/pages.css";
import {
    Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle
    } from 'reactstrap';

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
                <div
                className="page-header"
                style={{
                backgroundImage:
                    "url(" + require("assets/img/backgroundForm.png") + ")",
                }}
                >
                <div className ="init-container">
                    <div className="centered-container text-center">
                    <Card>
                        <CardBody>
                        <CardTitle>
                            <h1>Denuncia Registrada</h1>
                        </CardTitle>
                        <CardSubtitle>
                            <h3>Exitosamente</h3>
                        </CardSubtitle>
                        </CardBody>
                            <div className="text-center">
                                <img width="200px" src={success} alt="Card image cap" />
                            </div>
                        <CardBody>
                        <CardText>El código de su denuncia es .    
                            <strong>{this.state.incomeFolio}</strong>, recuerde este código para hacer futuras consultas.</CardText>
                        </CardBody>
                    </Card>
                    </div>
                </div>
                </div>
            );
        }
        else{
            return (
                <div
                className="page-header"
                style={{
                backgroundImage:
                    "url(" + require("assets/img/backgroundForm.png") + ")",
                }}
                >
                <div className ="init-container">
                    <div className="centered-container text-center">
                    <Card>
                        <CardBody>
                        <CardTitle text-center >
                            <h1>Denuncia no Enviada</h1>
                            </CardTitle>
                        </CardBody>
                        <div className="text-center">
                        <img  width="250 px" src={error} alt="Card image cap" />
                        </div>
                    </Card>
                    </div>
                </div>
                </div>
            );
        }
        
    }
}

export default SuccessPage;