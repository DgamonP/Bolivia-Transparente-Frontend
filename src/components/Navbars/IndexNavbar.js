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
              <a href = "/">
                  <img className="logo" src={logo} alt="Ministerio de Gobierno" height="60"/>
              </a>
                <button
                  aria-expanded={navbarCollapse}
                  className={classnames("navbar-toggler navbar-toggler", {
                    toggled: navbarCollapse
                  })}
                  onClick={toggleNavbarCollapse}
                >
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                  button
                </button>
              </div>
              <Collapse
                className="justify-content-end"
                navbar
                isOpen={navbarCollapse}
              >
                <Nav navbar>
                  <NavItem>
                    <NavLink
                      data-placement="bottom"
                      href="https://twitter.com/CreativeTim?ref=creativetim"
                      target="_blank"
                      title="Follow us on Twitter"
                    >
                      <i className="fa fa-twitter" />
                      <p className="d-lg-none">Twitter</p>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      data-placement="bottom"
                      href="https://www.facebook.com/CreativeTim?ref=creativetim"
                      target="_blank"
                      title="Like us on Facebook"
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
                 {context.token === 'null' &&
                    <NavItem>
                      <NavLink to="/viewDenuncias" tag={Link}>
                        <i className="nc-icon nc-book-bookmark" /> Ver Denuncias
                      </NavLink>
                    </NavItem>                  
                 }
                 {context.token !== 'null' &&
                    <NavItem>
                      <NavLink to="/myDenuncias" tag={Link}>
                        <i className="nc-icon nc-single-copy-04" /> Mis Denuncias
                      </NavLink>
                    </NavItem>                  
                 }
                 {context.token === 'null' &&
                    <NavItem>
                      <NavLink to="/signin" tag={Link}>
                        <i className="nc-icon nc-single-02" /> Iniciar Sesión
                      </NavLink>
                    </NavItem>                  
                 }
                 {context.token !== 'null' &&
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
                    </NavItem>                  
                 }          
                  <NavItem>                    
                    {
                    context.token === 'null' &&
                    <a href="/anonymousDenuncia">
                    <Button                      
                      className="btn-round"
                      color="warning"
                      href=" "                      
                      disabled
                    ><i className="nc-icon nc-tap-01" />
                       Denuncia Anonima
                    </Button>
                    </a>}  
                  </NavItem>
                  <NavItem>                    
                    {
                    context.token !== 'null' &&                  
                    <a href="/officialDenuncia">
                    <Button
                      className="btn-round"
                      color="success"
                      href=" /"                      
                      disabled                      
                    ><i className="nc-icon nc-tap-01" />
                       Denuncia Oficial 
                    </Button>
                    </a>  
                    }
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
