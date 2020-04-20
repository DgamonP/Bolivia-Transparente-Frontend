import React from "react";
import './logo.css'
import logo from './logoHomeEB.png'
import { Link } from "react-router-dom";
import classnames from "classnames";
import AuthContext from '../../context/auth-context';

// reactstrap components
import {
  Button,
  Collapse,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container
} from "reactstrap";

function IndexNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return(
    <AuthContext.Consumer>{
      (context) => {
        return (
          <Navbar className={classnames("fixed-top", navbarColor)} expand="lg"> 
            <Container>
              <div className="navbar-translate">
              <Link to= "/">
                  <img className="logo" src={logo} alt="Ministerio de Gobierno" height="60"/>
              </Link>
                <button
                  aria-expanded={navbarCollapse}
                  className= "navbar-toggler" 
                  onClick={toggleNavbarCollapse}
                >
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                  {/* button */}
                </button>
              </div>
              <Collapse
                className="justify-content-end"
                navbar
              >
                <Nav navbar>
                  <NavItem>
                    <NavLink
                      data-placement="bottom"
                      // href="https://twitter.com/CreativeTim?ref=creativetim"
                      href="https://www.facebook.com/MindeGobierno"
                      target="_blank"
                      title="Síguenos en twitter"
                    >
                      <i className="fa fa-twitter" />
                      <p className="d-lg-none">Twitter</p>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      data-placement="bottom"
                      href="https://www.facebook.com/MindeGobierno"
                      target="_blank"
                      title="Síguenos en Facebook"
                    >
                      <i className="fa fa-facebook-square" />
                      <p className="d-lg-none">Facebook</p>
                    </NavLink>
                  </NavItem>              
                  {/* <NavItem>
                      <NavLink to="/" tag={Link}>
                        <i className="nc-icon nc-layout-11" /> Inicio
                      </NavLink>
                  </NavItem> */}                               

                  <NavItem>
                    <NavLink to="/buscar" tag={Link}>
                      <i className="nc-icon nc-single-copy-04" /> Buscar Denuncia
                    </NavLink>
                  </NavItem> 
                 {context.token?
                    <NavItem>
                      <NavLink data-placement="bottom"
                              to="/"                              
                              onClick={ () => {
                                context.logout()
                                window.location.href='/'}
                              }
                              tag={Link}>
                        <i className="nc-icon nc-user-run" /> Cerrar Sesión
                      </NavLink>
                    </NavItem>:
                    <NavItem>
                      <NavLink to="/ingreso" tag={Link}>
                        <i className="nc-icon nc-single-02" /> Iniciar Sesión
                      </NavLink>
                    </NavItem>                  
                  }        
                  <NavItem>
                  <Link to="/denunciar">
                  {context.token?
                    <Button
                      className   ="btn-round"
                      color       ="success"
                      // href     ="/denunciar"                      
                      // disabled                      
                    ><i className="nc-icon nc-tap-01" />
                      Denuncia Oficial 
                    </Button>:
                    <Button                      
                      className   ="btn-round"
                      color       ="warning"
                      // href     ="/denunciar"                      
                      // disabled
                    ><i className="nc-icon nc-tap-01" />
                      Denuncia Anonima
                    </Button>
                  }
                  </Link>
                  </NavItem>
                </Nav>
              </Collapse>
            </Container>
          </Navbar>
          );
        }
      }
    </AuthContext.Consumer>
  );
}

export default IndexNavbar;
