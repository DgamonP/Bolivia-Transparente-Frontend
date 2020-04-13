import React from "react";
// nodejs library that concatenates strings
//import { logo } from '..'
//import logo from './'
import './logo.css'
import logo from './logoHomeEB.png'
import { Link } from "react-router-dom";
import classnames from "classnames";
import AuthContext from '../../context/auth-context';

// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
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
              <div className="logo">
              <a href = "/">
                  <img className="logo" src={logo} alt="Ministerio de Gobierno" height="60"/>
              </a>
              <div/>              
              {/* <Navbar bg="dark">
                <NavbarBrand href="/">
                  <img
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                  />
                </NavbarBrand>
              </Navbar> */}
                {/* <NavbarBrand
                  data-placement="bottom"
                  href="/"
                  target="_blank"
                  title="Coded by DeMS2020"
                  tag={Link}
                 > Ministerio de Gobierno
                </NavbarBrand> */}
               {/* <NavbarBrand href="/">
                  <img
                    alt=""
                    src="assets/img/logoSinFondo.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                  /> LOGO
                </NavbarBrand>
                <NavbarBrand> */}
{/*                   <a class="navbar-brand" href="/">
                    <img id="logo" class="d-inline-block mr-1" alt="Logo" src="assets/img/logoSinFondo.png"> 
                      <div class="d-inline-block mr-1">Jetze Kunnen<span>hoveniersbedrijf</span></div>
                  </a>
                  <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand" href="#!">
                <img id="logo" className="d-inline-block mr-1" alt="Logo" src="assets/img/logoSinFondo.png">
                  Navbar</a>
              </nav>
 */}                  
                  {/* <a class="navbar-brand" href="/">
                    <img src={logo} width="128" height="48" alt="Gobierno de México">
                  </a> */}
                              
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
                  <NavItem>
                    <NavLink
                      data-placement="bottom"
                      href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
                      target="_blank"
                      title="Follow us on Instagram"
                    >
                      <i className="fa fa-instagram" />
                      <p className="d-lg-none">Instagram</p>
                    </NavLink>
                  </NavItem>                
                  <NavItem>
                      <NavLink to="/" tag={Link}>
                        <i className="nc-icon nc-layout-11" /> Inicio
                      </NavLink>
                    </NavItem>                               
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
                        <i className="nc-icon nc-book-bookmark" /> Mis Denuncias
                      </NavLink>
                    </NavItem>                  
                 }
                 {context.token === 'null' &&
                    <NavItem>
                      <NavLink to="/signin" tag={Link}>
                        <i className="nc-icon nc-layout-11" /> Iniciar Sesión
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
                        <i className="nc-icon nc-layout-11" /> Cerrar Sesión
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
                    > Denuncia Anonima
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
                    > 
                      Denuncia Oficial 
                    </Button>
                    </a>  }
                  </NavItem>
                  {/* <NavItem>
                  <Button type="button" class="btn btn-outline-success and-all-other-classes"> 
                    <a href="signin" style="color:inherit"> Button  </a>
                  </Button>
                  </NavItem> */}
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
