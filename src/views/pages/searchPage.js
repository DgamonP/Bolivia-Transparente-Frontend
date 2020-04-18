import React from 'react'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import IndexNavbar from "../../components/Navbars/IndexNavbar.js";

class SearchPage extends React.Component{
    state = {
        form:{
            folio       : "",
            anonymous   : false,
        },
        emptyField      : false,
        notFound        : false,
        error           : undefined,
        networkError    : false,
    }

    handleChange = e =>{
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]     : e.target.value
            },
            emptyField              : false,
        });
        console.log(this.state);
    }

    handleCheckbox = e =>{
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]     : e.target.checked
            },
            emptyField              : false,
        });
        console.log(this.state);
    }

    search = async e => {
        this.props.history.push(`/ver/${this.state.form.folio}`);
    }

    render(){
        return (
            <React.Fragment>
                <IndexNavbar />
                <div className="init-container">
                    <div className="centered-container">
                        <h1 className="init-item"> Buscar Denuncia</h1>
                        <p className="init-item"> Si creo una denuncia anónima puede realizar la búsqueda sin ingresar en el sistema</p>
                        <p className="init-item"> Si creo una denuncia mediante una cuenta, por favor ingrese al sistema con sus credenciales para poder visualizarla</p>
                        <form>
                            <TextField
                                id          = "folio_input"
                                name        = "folio"
                                placeholder = "Introduzca el código de folio de la denuncia que busca"
                                margin      = "normal"
                                className   = "form-control"
                                type        = "text"
                                value       = {this.state.form.folio}
                                onChange    = {this.handleChange}
                            />
                            <label>Es una denuncia Anónima</label>
                            <Checkbox
                                color       = "default"
                                name        = "anonymous"
                                value       = {this.state.form.anonymous}
                                onChange    = {this.handleCheckbox}
                                inputProps  = {{ 'aria-label': 'checkbox with default color' }}
                            />
                            <div className="init-item">
                                <Button
                                    type        = "button"
                                    onClick     = {this.search}
                                    size        = "medium"
                                    color       = "primary"
                                    target      = "_blank"
                                >
                                    Buscar
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default SearchPage;
