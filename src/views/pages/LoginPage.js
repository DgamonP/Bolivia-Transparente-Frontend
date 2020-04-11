import React, {useEffect, useState} from "react";
import {signIn} from '../../api/graphql';

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";

function useInputHandler(type, placeholder, name) {
  const [value, setValue] = useState("")

  const  input = <Input  placeholder={placeholder} 
                      type={type}
                      onChange    = {e => setValue(e.target.value)}
                      className   = "form-control"
                      name        = {name}
                      value       = {value} />

  return [value, input]

      
}







export const  LoginPage = (props) => {

  document.documentElement.classList.remove("nav-open");

  const [user, setUser] = useState(null)
  
  const [passValue, inputPassword] = useInputHandler("password", "Password", "password")
  const [userValue, inputUser] = useInputHandler("email", "Email", "email")

  useEffect(() => {
    console.log(passValue)
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });


const login = (user, pass)=> {
  console.log(user)
  console.log(pass)
   signIn(user, pass)
      .then(results=>{
          console.log("Signin results:");
          console.log(results);

          var token = results.data.data.login.token
          if(token){
              token = token;
              console.log("Login successful, new token is:");
              console.log(token);

              props.redirect();
          }
      }).catch(error=>{
          console.log(error);
          if(error === "Network Error"){          //TODO not working by now
              console.log("Problema de comunicación");
              //this.setState({network:error, warning:false});
          }else{                          // by now: Request failed with status code 500
              console.log("Login error");
              //this.setState({errorLogin:true, warning:false});
          }
      });
  
}

  
  return (
    <>
      <ExamplesNavbar />
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/The-Death-Road-Bolivia.jpg") + ")"
        }}
      >
        <div className="filter" />
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto">
                <h3 className="title mx-auto">Bienvenido</h3>
                <div className="social-line text-center">
                  <Button
                    className="btn-neutral btn-just-icon mr-1"
                    color="facebook"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    <i className="fa fa-facebook-square" />
                  </Button>
                  <Button
                    className="btn-neutral btn-just-icon mr-1"
                    color="google"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    <i className="fa fa-google-plus" />
                  </Button>
                  <Button
                    className="btn-neutral btn-just-icon"
                    color="twitter"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    <i className="fa fa-twitter" />
                  </Button>
                </div>
                <Form className="register-form">
                <label>Email</label>
                  { inputUser }
                  
                <label>Password</label>
                {inputPassword}
                <Button block className="btn-round" onClick={() =>{

                  login(userValue, passValue )

                }} color="danger">
                  login
                </Button>
                </Form>
                <div className="forgot">
                  <Button
                    className="btn-link"
                    color="danger"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Olvidaste tu Contraseña?
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
        <div className="footer register-footer text-center">
          <h6>
            © {new Date().getFullYear()}, Nosotros {" "}
            <i className="fa fa-heart heart" /> te Cuidamos
          </h6>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
