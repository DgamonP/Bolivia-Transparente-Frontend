import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";

function SigninForm(props) {
  useEffect(() => {
    document.getElementById("login").classList.remove("card");
    document.getElementById("login").classList.add("card-register");
    console.log("remove and add card");
    return () => {
      document.getElementById("login").classList.remove("card-register");
    };
  });

  return (
    <>
      <div
        className="page-header"
        style={{
          backgroundImage:
            "url(" + require("assets/img/backgroundForm.png") + ")",
        }}
      >
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="6">
              <Card id="login" className="card-register ml-auto mr-auto" 
                    style={{
                    backgroundImage:"url(" + require("assets/img/login.png") + ")",
                    }}>
                <h3 className="title mx-auto text-dark">Iniciar Sesión</h3>
                <Form className="register-form">
                  <label>Email</label>
                  <Input
                    id="email_signin_input"
                    placeholder="Ingrese su correo de registro"
                    margin="normal"
                    onChange={props.onChange}
                    className="form-control"
                    type="email"
                    name="email"
                    value={props.vars.email}
                  />
                  <label>Contraseña</label>
                  <Input
                    id="password_signin_input"
                    placeholder="Ingrese su contraseña"
                    margin="normal"
                    onChange={props.onChange}
                    className="form-control"
                    type="password"
                    name="password"
                    value={props.vars.password}
                  />

                  <Row className="justify-content-md-center">
                    <Button
                      className="btn-round mr-1 btn-sm btn-block"
                      color="info"
                      outline
                      type="button"
                      onClick={props.login}
                    >
                      Login
                    </Button>
                    <Button
                      /* component={Link} to="/registro" */
                      href="/registro"
                      className="btn-round mr-1 btn-sm btn-block"
                      color="success"
                      outline
                      type="button"
                    >
                      Registro
                    </Button>
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
                <div
                  align="center"
                  style={{ paddingLeft: 24, paddingRigth: 24 }}
                >
                  {props.warning && (
                    <div className="alert alert-warning">
                      {" "}
                      Por favor introduzca su correo y contraseña.{" "}
                    </div>
                  )}
                </div>
                <div
                  align="center"
                  style={{ paddingLeft: 24, paddingRigth: 24 }}
                >
                  {props.errorLogin && (
                    <div className="alert alert-warning">
                      {" "}
                      El usuario ingresado no existe.{" "}
                    </div>
                  )}
                </div>
                <div
                  align="center"
                  style={{ paddingLeft: 24, paddingRigth: 24 }}
                >
                  {props.network && (
                    <div className="alert alert-danger">
                      {" "}
                      Fallo de comunicación, inténtelo más tarde.{" "}
                    </div>
                  )}
                </div>
                <div
                  align="center"
                  style={{ paddingLeft: 24, paddingRigth: 24 }}
                >
                  {props.password && (
                    <div className="alert alert-danger">
                      {" "}
                      Contraseña incorrecta.{" "}
                    </div>
                  )}
                </div>
                <div align="center" width="100%"></div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default SigninForm;
