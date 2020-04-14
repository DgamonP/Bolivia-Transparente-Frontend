import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function SigninForm(props){
    console.log("Arriving props.vars:");
    console.log(props.vars);
    return (<div>
        <h1 style={{padding:24}}> Ingresar </h1>
        <form>
            <div className = "form-group">
                <label style={{paddingRight: 24, paddingLeft: 24}}>Email</label>
                <TextField
                    style={{paddingBottom:24, paddingRight: 24, paddingLeft: 24}}
                    id          = "email_signin_input"
                    placeholder = "Ingrese su correo de registro"
                    margin      = "normal"
                    onChange    = {props.onChange}
                    className   = "form-control"
                    type        = "email"
                    name        = "email"
                    value       = {props.vars.email}
                    />
            </div>
            <div className = "form-group">
                <label style={{paddingRight: 24, paddingLeft: 24}}>Password</label>
                <TextField
                    style={{paddingBottom:24, paddingRight: 24, paddingLeft: 24}}
                    id          = "password_signin_input"
                    placeholder = "Ingrese su contraseña"
                    margin      = "normal"
                    onChange    = {props.onChange}
                    className   = "form-control"
                    type        = "password"
                    name        = "password"
                    value       = {props.vars.password}
                    />
            </div>
            <div align="center" style={{paddingLeft: 24, paddingRigth: 24}}>
                {props.warning && <div className="alert alert-warning"> Por favor introduzca sus credenciales </div>}
            </div>
            <div align="center" style={{paddingLeft: 24, paddingRigth: 24}}>
                {props.errorLogin && <div className="alert alert-warning"> El usuario ingresado no existe </div>}
            </div>
            <div align="center" style={{paddingLeft: 24, paddingRigth: 24}}>
                {props.network && <div className="alert alert-danger"> Fallo de comunicación, inténtelo más tarde </div>}
            </div>
            <div align="center" width="100%">
                <Button variant="secondary" style={{padding: 14}} onClick={props.login} type="button" size="small" color="primary" target="_blank">
                    Ingresar
                </Button>
            </div>
        </form>
    </div>);
}

export default SigninForm;