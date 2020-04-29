/*eslint-disable*/
import React from "react";

// reactstrap components
import { Row, Container } from "reactstrap";

function Footer() {
  return (
    <footer className="footer footer-black footer-white">
      <Container>
        <Row>
          <nav className="footer-nav">
            <ul>
              <li>
                <a
                  href="http://deepmicrosystems.com/"
                  target="_blank"
                >
                  Bolivia Transparente
                </a>
              </li>
              <li>
                <a
                  href="/"
                  target="_blank"
                >
                  Terminos y Condiciones
                </a>
              </li>
              <li>
                <a
                  href="/"
                  target="_blank"
                >
                  Licencia
                </a>
              </li>
            </ul>
          </nav>
          <div className="credits ml-auto">
            <span className="copyright">
              © {new Date().getFullYear()}, Ministerio de Transparencia
            </span>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
