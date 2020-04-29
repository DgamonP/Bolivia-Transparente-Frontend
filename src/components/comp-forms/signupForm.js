import React from 'react';
import state from '../../model/state'
//import Button from '@material-ui/core/Button';
import {signIn, createUser} from '../../api/graphql';

import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";

class SignupForm extends React.Component{
    state = {
        form: {
            firstName       : "",
            lastName1       : "",
            lastName2       : "",
            age             : "",
            email           : "",
            phone           : "",
            identityCard    : "",
            ext             : "Other",
            password        : "",
            repeatPassword  : "",
            gender          : "Other",
        },
        loading             : false,
        passwordDoNotMatch  : false,
        emailAlreadyExists  : false,
        CIAlreadyExists     : false,
        couldNotConnect     : false,
        emptyFields         : false,
        error               : null,
    };

    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
            loading: false,
            passwordDoNotMatch  : false,
            emailAlreadyExists  : false,
            CIAlreadyExists     : false,
            couldNotConnect     : false,
            emptyFields         : false,
            error               : null,
        });
        // console.log("Updated state to:");
        // console.log(this.state.form);
    };

    signupAndLogin = async e => {
        if(this.state.form.firstName === "" || this.state.form.lastName1 === "" || this.state.form.lastName2 === "" || this.state.form.email === "" || this.state.form.phone === "" || this.state.form.identityCard === "" || this.state.form.password === "" || this.state.form.repeatPassword === ""){
            this.setState({emptyFields : true})
        }
        else{
            if(this.state.form.password !== this.state.form.repeatPassword){
                this.setState({passwordDoNotMatch : true})
            }
            else{
                let signupResult
                try{
                    signupResult = await createUser(this.state.form.email,this.state.form.firstName,this.state.form.lastName1,this.state.form.lastName2,this.state.form.age,this.state.form.phone,this.state.form.identityCard,this.state.form.ext,this.state.form.gender,this.state.form.password);
                    console.log("Create user result:");
                    console.log(signupResult);
                }catch(error){
                    console.log("Error found", error)
                    switch(error.message){
                        case "Already registered email":
                            this.setState({emailAlreadyExists: true, CIAlreadyExists: false, couldNotConnect: false});
                            break;
                        case "Already registered identity card":
                            this.setState({CIAlreadyExists: true, emailAlreadyExists: false, couldNotConnect: false});
                            break;
                        default:
                            this.setState({couldNotConnect: true, emailAlreadyExists: false, CIAlreadyExists: false});
                            break;
                    }
                }

                //console.log("Signup result", signupResult);  // Undefined when Error thrown
                if(signupResult){
                    await signIn(this.state.form.email, this.state.form.password)
                    .then(results => {
                        console.log("Login Result Login");
                        console.log(results);
                        let token = results.token
                        if(token){
                            state.token = token;
                            window.localStorage.setItem('token',token)
                            window.localStorage.setItem('id', results.userId);
                            console.log("Signup successful, new token is:");
                            console.log(token);
                            this.setState({warning: false, error: null});
                            window.location.href='/';
                            /* this.props.redirect(); */
                        }
                    }).catch(error=>{
                        console.log("Error in signin after signup: ", error.message);
                        this.setState({couldNotConnect: true, emailAlreadyExists: false, CIAlreadyExists: false})
                    });
                }
            }
        }
    };
    
    render(){
        return(
        <React.Fragment>
            <div
                className="page-header"
                style={{
                backgroundImage:
                    "url(" + require("assets/img/backgroundForm.png") + ")",
                }}
            >
            <Container>
            <br/><br/>
                <Row>
                    <Col className="ml-auto mr-auto" lg="12">
                    <Card id="singup" className="card-signup ml-auto mr-auto text-dark" 
                            style={{ 
                            backgroundImage:"url(" + require("assets/img/backgrounSignup.png") + ")",
                            }}>
                        <h3 className="title mx-auto text-dark">Crear Nuevo Usuario</h3>
                        <Form className="register-form">
                        <Row >
                            <Col md={12}>
                            <label>Nombre(s)</label>
                            <Input
                                id          = "firstName_signup_input"
                                placeholder = "Ingrese su nombre como figura en su cédula"
                                margin      = "normal"
                                onChange    = {this.handleChange}
                                className   = "form-control"
                                type        = "text"
                                name        = "firstName"
                                value       = {this.state.form.firstName}
                                />
                            </Col>
                        </Row>
                        <Row>
                        <Col md={6}>
                            <label>Apellido Paterno</label>
                                <Input
                                    id          = "lastName1_signup_input"
                                    placeholder = "Apellido paterno igual a la cedula"
                                    margin      = "normal"
                                    onChange    = {this.handleChange}
                                    className   = "form-control"
                                    type        = "text"
                                    name        = "lastName1"
                                    value       = {this.state.form.lastName1}
                                />
                        </Col>
                        <Col md={6}>
                            <label>Apellido Materno</label>
                            <Input
                                id          = "lastName2_signup_input"
                                placeholder = "Apellido materno igual a la cedula"
                                margin      = "normal"
                                onChange    = {this.handleChange}
                                className   = "form-control"
                                type        = "text"
                                name        = "lastName2"
                                value       = {this.state.form.lastName2}
                                />
                        </Col>
                        </Row>
                        <Row>
                        <Col md={4}>
                            <label>Cedula</label>
                                <Input
                                    id          = "ci_signup_input"
                                    placeholder = "Carnét de identidad tal y como está en su cédula"
                                    margin      = "normal"
                                    onChange    = {this.handleChange}
                                    className   = "form-control"
                                    type        = "text"
                                    name        = "identityCard"
                                    value       = {this.state.form.identityCard}
                                />
                        </Col>
                        <Col md={2}>
                            <label>Ext.</label>
                            <Input type="select" 
                                    value       = {this.state.form.ext}
                                    name        = "ext"
                                    onChange    = {this.handleChange}>
                                    <option value="Other">Otro</option>
                                    <option value="LP">LP</option>
                                    <option value="CB">CB</option>
                                    <option value="SC">SC</option>
                                    <option value="OR">OR</option>
                                    <option value="PT">PT</option>
                                    <option value="TJ">TJ</option>
                                    <option value="CH">CH</option>
                                    <option value="BE">BE</option>
                                    <option value="PD">PD</option>
                            </Input>
                        </Col>
                        <Col md={3}>
                            <label>Edad</label>
                            <Input
                                id          = "age_signup_input"
                                placeholder = "Edad"
                                margin      = "normal"
                                onChange    = {this.handleChange}
                                className   = "form-control"
                                type        = "number"
                                name        = "age"
                                value       = {this.state.form.age}
                                />
                        </Col>
                        <Col md={3}>
                            <label>Genero</label>
                            <Input  type="select" 
                                    value       = {this.state.form.gender}
                                    name        = "gender"
                                    onChange    = {this.handleChange}>
                                <option value="Woman">Mujer</option>
                                <option value="Man">Hombre</option>
                                <option value="Other">Otro</option>
                            </Input>
                        </Col>
                        </Row>
                        <Row>
                        <Col md={6}>
                            <label>Correo Electronico</label>
                                <Input
                                    id          = "email_signup_input"
                                    placeholder = "Correo electrónico de contacto"
                                    margin      = "normal"
                                    onChange    = {this.handleChange}
                                    className   = "form-control"
                                    type        = "email"
                                    name        = "email"
                                    value       = {this.state.form.email}
                                />
                        </Col>
                        <Col md={6}>
                            <label>Numero de Celular</label>
                            <Input
                                id          = "phone_signup_input"
                                placeholder = "Introduzca su número telefónico"
                                margin      = "normal"
                                onChange    = {this.handleChange}
                                className   = "form-control"
                                type        = "text"
                                name        = "phone"
                                value       = {this.state.form.phone}
                                />
                        </Col>
                        </Row>
                        <Row>
                        <Col md={6}>
                            <label>Contraseña</label>
                                <Input
                                    id          = "password_signup_input"
                                    placeholder = "Por favor ingrese su contraseña"
                                    margin      = "normal"
                                    onChange    = {this.handleChange}
                                    className   = "form-control"
                                    type        = "password"
                                    name        = "password"
                                    value       = {this.state.form.password}
                                />
                        </Col>
                        <Col md={6}>
                            <label>Repita su Contraseña</label>
                            <Input
                                id          = "password_repeat_signup_input"
                                placeholder = "Por favor repita su contraseña"
                                margin      = "normal"
                                onChange    = {this.handleChange}
                                className   = "form-control"
                                type        = "password"
                                name        = "repeatPassword"
                                value       = {this.state.form.repeatPassword}
                                />
                        </Col>
                        </Row>
                        <div align="center" style = {{paddingTop: 3}}>
                            {this.state.emptyFields && <div className="alert alert-warning"> Por favor complete todos los campos </div>}
                        </div>
                        <div align="center" >
                            {this.state.couldNotConnect && <div className="alert alert-danger"> No se pudo establecer la conexión, inténtelo más tarde </div>}
                        </div>
                        <div align="center" >
                            {this.state.passwordDoNotMatch && <div className="alert alert-danger"> Las contraseñas no coinciden </div>}
                        </div>
                        <div align="center" >
                            {this.state.emailAlreadyExists && <div className="alert alert-warning"> El correo introducido ya está registrado </div>}
                        </div>
                        <div align="center" >
                            {this.state.CIAlreadyExists && <div className="alert alert-warning"> El carnet de identidad ya está registrado </div>}
                        </div>
                        <Row className="justify-content-md-center">
                            <Col md={6}>
                            <Button
                            className="btn-round mr-1 btn-sm btn-block"
                            type    = "button"
                            onClick = {this.signupAndLogin}
                            size    = "small"
                            color   = "primary"
                            target  = "_blank">
                            Registrarse
                            </Button>
                            </Col>
                        </Row>
                    </Form>
                    
                    <div className="forgot">
                        <Button
                        className="btn btn-link btn-sm"
                        color="light" 
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        >
                        © {new Date().getFullYear()}, Ministerio de Gobierno      .
                        </Button>                       
                    </div>   
                    <br/><br/> 
                    </Card>
                    
                
                
                        </Col>
                    </Row>
            </Container> 
            </div>
        </React.Fragment>);
    }
}

export default SignupForm;