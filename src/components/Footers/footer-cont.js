import React from "react";

// reactstrap components
import { Row, Col, Container} from "reactstrap";
import DirectionMap from "./directionMap";

function Foote() {
  return (
    <>
      <footer className="footer footer-black footer-gray justify-content-md-center sharing-area text-center">
        <Container>
          <Row>
            <Col md="5">
              <br/>
              <h1>Bolivia Transparente</h1>
              <h5>Sistema integrado de denuncias</h5>
            </Col>
            <Col md="2">
              <h6>Telefonos</h6>
              <h6>(+591-2)2170200</h6>
              <h6>(+591-2)2120002</h6>
              <h6>(+591-2)2120003</h6>
              <h6>800 10 1819</h6>
            </Col>
            <Col md="2">
              <h6>Navegacion</h6>
              <li>
                <a href="/" target="_blank">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="/" target="_blank">
                  Terminos
                </a>
              </li>
              <li>
                <a href="/" target="_blank">
                Anuncios
                </a>
              </li>
            </Col>
            <Col className="text-center" md="2">
              <h6>Direccion</h6>
              <div className='text-center'>
                <DirectionMap />
              </div>
            </Col>
          </Row>
          {/* <Row className="text-center" lg="10" md="6">
            <nav className="footer-nav">
              <ul>
                <li>
                  <a href="/" target="_blank">
                    Buscar Denuncia
                  </a>
                </li>
                <li>
                  <a href="/signin" target="_blank">
                    Denunciar
                  </a>
                </li>
                <li>
                  <a href="/signin" target="_blank">
                    Terminos y Condiciones
                  </a>
                </li>
                <li>
                  <a href="/signin" target="_blank">
                    Licencia
                  </a>
                </li>
              </ul>
            </nav>
            <div className="credits ml-auto">
              <span className="copyright">
                © {new Date().getFullYear()}, Ministerio de Tranparencia 800 10
                1819
              </span>
            </div>
          </Row>
        */} 
        </Container>
      </footer>
    </>
  );
}

export default Foote;
