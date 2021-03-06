import React from "react";
import "assets/demo/demo.css";
import "assets/scss/paper-kit.scss";
import "assets/css/bootstrap.min.css";
import "./styles/pages.css";
import { getEvent } from "../../api/graphql";
import Checkbox from "@material-ui/core/Checkbox";
import Figura from "../../assets/img/card.png";
import {
  Button,
} from "reactstrap";

class SearchPage extends React.Component {
  userId = null;
  state = {
    form: {
      folio: "",
      anonymous: false,
    },
    emptyField: false,
    networkError: false,
    folioNotFound: false,
    notLoggedWarning: false,
    showCheckbox: false,
  };

  componentDidMount() {
    this.userId = window.localStorage.getItem("id");
    let auxAnonymous = !Boolean(this.userId);
    console.log(
      "User id is: ",
      this.userId,
      " updating checkbox state to:",
      auxAnonymous
    );
    this.setState({
      form: { anonymous: auxAnonymous },
      showCheckbox: !auxAnonymous,
    });
    console.log("Set anonymous state to:", this.state.form.anonymous);
  }

  handleChange = (e) => {
    console.log("Setting anonymous to:", this.state.form.anonymous);
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
      emptyField: false,
      networkError: false,
      folioNotFound: false,
      notLoggedWarning: false,
      anonymous: !Boolean(this.userId),
    });
    console.log(this.state);
  };

  handleCheckbox = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.checked || !this.userId,
      },
      emptyField: false,
      networkError: false,
      folioNotFound: false,
      notLoggedWarning: !this.userId,
      anonymous: !Boolean(this.userId),
    });
    console.log(this.state);
  };

  search = async (e) => {
    // console.log("Testing folio: ", this.state.form.folio);
    // console.log("Setting anonymous to:",!Boolean(this.userId))
    if (!this.state.form.folio || this.state.form.folio === "") {
      this.setState({ emptyField: true, anonymous: !Boolean(this.userId) });
    } else {
      let eventTitle;
      if (this.state.form.anonymous) {
        console.log("Anonymous request");
        this.userId = "Anonymous";
      } else {
        console.log("Not anonymous request");
      }

      getEvent(this.userId, this.state.form.folio)
        .then((event) => {
          eventTitle = event.title;
          console.log("Received event with title", eventTitle);
          window.localStorage.setItem("event", JSON.stringify(event));
          if (eventTitle) {
            this.props.history.push(`/ver`);
          }
        })
        .catch((error) => {
          console.log("Handling error: ", error.message);
          if (error.message === "No event found with that folio") {
            this.setState({
              folioNotFound: true,
              anonymous: !Boolean(this.userId),
            });
          } else {
            this.setState({
              networkError: true,
              anonymous: !Boolean(this.userId),
            });
          }
        });
    }
  };

  render() {
    console.log("Rebuilding with anonymous state:", this.state.form.anonymous);
    return (
      <React.Fragment>
        {/* <IndexNavbar /> debugeando */}
        <div
          className="page-header"
          style={{
            backgroundImage:
              "url(" + require("assets/img/backgroundForm.png") + ")",
          }}
        >
            
          <div className="card mb-3">
            <img className="card-img-top" src={Figura} alt="" />
            <div className="card-body">
              <h4 className="init-item">Buscar Folio de Denuncia</h4>
              {this.userId ? (
                <p className="init-item">
                  {" "}
                  Puede realizar la búsqueda de denuncias personales o indicar
                  abajo si busca una denuncia anónima.
                </p>
                ) : (
                <p className="init-item">
                  {" "}
                  Sólo puede realizar búsqueda de denuncias anónimas, ingrese al
                  sistem para ver denuncias personales.
                </p>
              )}
              <div className="input-group">
                <input
                  id          = "folio_input"
                  name        = "folio"
                  placeholder = "Introduzca el código de folio de la denuncia que busca"
                  margin      = "normal"
                  className   = "form-control"
                  type        = "text"
                  value       = {this.state.form.folio}
                  onChange    = {this.handleChange}                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="fa fa-group"></i>
                  </span>
                </div>
              </div>
              {this.state.showCheckbox ? (
                <div>
                  <label align="center">Es una denuncia Anónima</label>
                  <Checkbox
                    color="default"
                    name="anonymous"
                    value={this.state.showCheckbox}
                    onChange={this.handleCheckbox}
                    inputProps={{
                      "aria-label": "checkbox with default color",
                    }}
                  />
                </div>
              ) : (
                <div></div>
              )}
              <div className="text-center">
                <br/>
                <Button className="btn-round ml-1"  
                        type="button"
                        onClick={this.search}
                        size="large"
                        color="info"
                        target="_blank">
                  Buscar
                </Button>
              </div>
              <div align="center">
                {this.state.emptyField && (
                  <div
                    style={{ paddingLeft: 24, paddingRigth: 24 }}
                    className="alert alert-warning"
                  >
                    {" "}
                    Por favor ingrese el código de folio{" "}
                  </div>
                )}
              </div>
              <div align="center">
                {this.state.networkError && (
                  <div
                    style={{ paddingLeft: 24, paddingRigth: 24 }}
                    className="alert alert-danger"
                  >
                    {" "}
                    Problema de comunicación, inténtelo más tarde{" "}
                  </div>
                )}
              </div>
              <div align="center">
                {this.state.folioNotFound && (
                  <div
                    style={{ paddingLeft: 24, paddingRigth: 24 }}
                    className="alert alert-warning"
                  >
                    {" "}
                    No se encontró el código de folio introducido{" "}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchPage;
