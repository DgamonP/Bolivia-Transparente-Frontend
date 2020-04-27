import React from 'react';
import state from '../../model/state'
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import {signIn, createUser} from '../../api/graphql';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

class SignupForm extends React.Component{
    state = {
        form: {
            firstName:      "",
            lastName1:      "",
            lastName2:      "",
            age:            "",
            email:          "",
            phone:          "",
            identityCard:   "",
            ext:            "Other",
            password:       "",
            repeatPassword: "",
            gender:         "Other",
        } ,
        loading: false,
        passwordDoNotMatch : false,
        userAlreadyExist : false,
        couldNotConnect : false,
        emptyFields : false,
        error : null,
    };

    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
            loading: false,
            passwordDoNotMatch : false,
            userAlreadyExist : false,
            couldNotConnect : false,
            emptyFields : false,
            error : null,
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
                createUser(this.state.form.email,this.state.form.firstName,this.state.form.lastName1,this.state.form.lastName2,this.state.form.age,this.state.form.phone,this.state.form.identityCard,this.state.form.ext,this.state.form.gender,this.state.form.password)
                    .then(result=>{
                        console.log("Create user result:");
                        console.log(result);
                        signIn(this.state.form.email,this.state.form.password)
                            .then(results=>{
                                console.log("Login Result Login");
                                console.log(results);
                                let token = results.data.data.login.token
                                if(token){
                                    state.token = token;
                                    console.log("Signup successful, new token is:");
                                    console.log(token);
                                    this.setState({warning:false, error:null});
                                    this.props.redirect();
                                }
                            }).catch(error=>{
                                this.setState({couldNotConnect: true})
                            });
                        
                    }).catch(error=>{
                        this.setState({userAlreadyExist: true})
                    });
            }
        }
    };
    
    render(){
        return(
        <div>
            <h1 style={{padding:24}}> Nuevo Denunciante</h1>
            <form onSubmit = {this.handleSubmit}>
                <div className = "form-group">
                    <label style    ={{paddingRight: 24, paddingLeft: 24}}>Nombres</label>
                    <TextField
                        style       ={{paddingBottom:24, paddingRight: 24, paddingLeft: 24}}
                        id          = "firstName_signup_input"
                        placeholder = "Ingrese su nombre como figura en su cédula"
                        margin      = "normal"
                        onChange    = {this.handleChange}
                        className   = "form-control"
                        type        = "text"
                        name        = "firstName"
                        value       = {this.state.form.firstName}
                        />
                </div>
                <div className = "form-group">
                    <label style    ={{paddingRight: 24, paddingLeft: 24}}>Apellido Paterno</label>
                    <TextField
                        style       ={{paddingBottom:24, paddingRight: 24, paddingLeft: 24}}
                        id          = "lastName1_signup_input"
                        placeholder = "Ingrese su apellido paterno como figura en su cédula"
                        margin      = "normal"
                        onChange    = {this.handleChange}
                        className   = "form-control"
                        type        = "text"
                        name        = "lastName1"
                        value       = {this.state.form.lastName1}
                        />
                </div>
                <div className = "form-group">
                    <label style    ={{paddingRight: 24, paddingLeft: 24}}>Apellido Materno</label>
                    <TextField
                        style       ={{paddingBottom:24, paddingRight: 24, paddingLeft: 24}}
                        id          = "lastName2_signup_input"
                        placeholder = "Ingrese su apellido materno como figura en su cédula"
                        margin      = "normal"
                        onChange    = {this.handleChange}
                        className   = "form-control"
                        type        = "text"
                        name        = "lastName2"
                        value       = {this.state.form.lastName2}
                        />
                </div>
                <div>
                    <div className="row">
                        <div className="col-7   ">
                            <div className = "form-group">
                                <label style        ={{paddingRight: 24, paddingLeft: 24}}>Email</label>
                                <TextField
                                        style       ={{paddingBottom:24, paddingRight: 24, paddingLeft: 24}}
                                        id          = "email_signup_input"
                                        placeholder = "Correo electrónico de contacto"
                                        margin      = "normal"
                                        onChange    = {this.handleChange}
                                        className   = "form-control"
                                        type        = "email"
                                        name        = "email"
                                        value       = {this.state.form.email}
                                    />
                            </div>
                        </div>
                        <div className="col-2">
                            <div className = "form-group">
                                <label style    ={{paddingRight: 24, paddingLeft: 24}}>Edad</label>
                                <TextField
                                    id          = "age_signup_input"
                                    margin      = "normal"
                                    onChange    = {this.handleChange}
                                    className   = "form-control"
                                    type        = "number"
                                    name        = "age"
                                    value       = {this.state.form.age}
                                    />
                            </div>
                        </div>
                        <div className="col-3">
                            <div className          = "form-group">
                                <label style        ={{paddingRight: 24, paddingLeft: 24}}>Género</label>
                                <Select style       ={{paddingBottom:16, paddingRight: 16, paddingLeft: 16}}
                                        value       = {this.state.form.gender}
                                        name        = "gender"
                                        onChange    = {this.handleChange}>
                                    <MenuItem value="Woman">Mujer</MenuItem>
                                    <MenuItem value="Man">Hombre</MenuItem>
                                    <MenuItem value="Other">Otro</MenuItem>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className = "form-group">
                    <label style={{paddingRight: 24, paddingLeft: 24}}>Número de teléfono</label>
                    <TextField
                        style       = {{paddingBottom:24, paddingRight: 24, paddingLeft: 24}}
                        id          = "phone_signup_input"
                        placeholder = "Por favor introduzca su número telefónico para que le contactemos"
                        margin      = "normal"
                        onChange    = {this.handleChange}
                        className   = "form-control"
                        type        = "text"
                        name        = "phone"
                        value       = {this.state.form.phone}
                        />
                </div>
                <div>
                    <div className="row">
                        <div className="col-9">
                            <div className = "form-group">
                                <label style={{paddingRight: 24, paddingLeft: 24}}>Carnét de Identidad</label>
                                <TextField
                                    style       ={{paddingBottom:24, paddingRight: 24, paddingLeft: 24}}
                                    id          = "ci_signup_input"
                                    placeholder = "Carnét de identidad tal y como está en su cédula"
                                    margin      = "normal"
                                    onChange    = {this.handleChange}
                                    className   = "form-control"
                                    type        = "text"
                                    name        = "identityCard"
                                    value       = {this.state.form.identityCard}
                                    />
                            </div>
                        </div>
                        <div className="col-3">
                            <div className = "form-group">
                                <label style={{paddingRight: 24, paddingLeft: 24}}>Extensión</label>
                                <Select style       ={{paddingBottom:16, paddingRight: 16, paddingLeft: 16}}
                                        value       = {this.state.form.ext}
                                        name        = "ext"
                                        onChange    = {this.handleChange}>
                                    <MenuItem value="LP">LP</MenuItem>
                                    <MenuItem value="CB">CB</MenuItem>
                                    <MenuItem value="SC">SC</MenuItem>
                                    <MenuItem value="OR">OR</MenuItem>
                                    <MenuItem value="PT">PT</MenuItem>
                                    <MenuItem value="TJ">TJ</MenuItem>
                                    <MenuItem value="CH">CH</MenuItem>
                                    <MenuItem value="BE">BE</MenuItem>
                                    <MenuItem value="PD">PD</MenuItem>
                                    <MenuItem value="Other">Otro</MenuItem>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="row">
                        <div className="col-6">
                            <div className = "form-group">
                                <label style={{paddingRight: 24, paddingLeft: 24}}>Contraseña</label>
                                <TextField
                                    style={{paddingBottom:24, paddingRight: 24, paddingLeft: 24}}
                                    id          = "password_signup_input"
                                    placeholder = "Por favor ingrese su contraseña"
                                    margin      = "normal"
                                    onChange    = {this.handleChange}
                                    className   = "form-control"
                                    type        = "password"
                                    name        = "password"
                                    value       = {this.state.form.password}
                                    />
                            </div> 
                        </div>

                        <div className="col-6">
                        <div className = "form-group">
                            <label style={{paddingRight: 24, paddingLeft: 24}}>Repita su contraseña</label>
                            <TextField
                                style={{paddingBottom:24, paddingRight: 24, paddingLeft: 24}}
                                id          = "password_repeat_signup_input"
                                placeholder = "Por favor repita su contraseña"
                                margin      = "normal"
                                onChange    = {this.handleChange}
                                className   = "form-control"
                                type        = "password"
                                name        = "repeatPassword"
                                value       = {this.state.form.repeatPassword}
                                />
                        </div>
                        </div>
                    </div>
                </div>
                <div align="center" style={{paddingLeft: 24, paddingRigth: 24}}>
                    {this.state.emptyFields && <div className="alert alert-warning"> Por favor complete todos los campos </div>}
                </div>
                <div align="center" style={{paddingLeft: 24, paddingRigth: 24}}>
                    {this.state.couldNotConnect && <div className="alert alert-danger"> No se pudo establecer la conexión, inténtelo más tarde </div>}
                </div>
                <div align="center" style={{paddingLeft: 24, paddingRigth: 24}}>
                    {this.state.passwordDoNotMatch && <div className="alert alert-danger"> Las contraseñas no coinciden </div>}
                </div>
                <div align="center" style={{paddingLeft: 24, paddingRigth: 24}}>
                    {this.state.userAlreadyExist && <div className="alert alert-warning"> El usuario ya está registrado </div>}
                </div>
                <div align="center" width="100%">
                    <Button style={{padding: 24}} type="button" onClick={this.signupAndLogin} size="small" color="primary" target="_blank">
                        Registrarse
                    </Button>
                </div>
            </form>
        </div>);
    }
}

export default SignupForm;