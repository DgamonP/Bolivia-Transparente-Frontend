import React from "react";
// nodejs library that concatenates strings
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
              <div className="navbar-translate">
                <NavbarBrand
                  data-placement="bottom"
                  href="/index"
                  target="_blank"
                  title="Coded by Creative Tim"
                >
                  Ministerio de Gobierno
                </NavbarBrand>
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
                  {/* <NavItem>
                    <NavLink
                      data-placement="bottom"
                      href="https://www.github.com/CreativeTimOfficial/paper-kit-react?ref=creativetim"
                      target="_blank"
                      title="Star on GitHub"
                    >
                      <i className="fa fa-github" />
                      <p className="d-lg-none">GitHub</p>
                    </NavLink>
                  </NavItem> */}
                  <NavItem>
                    <NavLink
                      href="/"
                      target="_blank">
                      <i className="nc-icon nc-book-bookmark" /> Inicio
                    </NavLink>
                  </NavItem>                
                  <NavItem>
                    {
                    context.token === 'null' &&
                    <NavLink                      
                      href="/viewDenuncias">
                      <i className="nc-icon nc-layout-11" /> Ver Denuncias
                    </NavLink>
                    }
                  </NavItem>
                  <NavItem>
                    {
                    context.token !== 'null' &&
                    <NavLink                      
                      href="/myDenuncias">
                      <i className="nc-icon nc-layout-11" /> Mis Denuncias
                    </NavLink>
                    }
                  </NavItem>
                  <NavItem>
                    {
                    context.token === 'null' &&
                    <NavLink                      
                      href="/signin">
                      <i className="nc-icon nc-layout-11" /> Login
                    </NavLink>
                    }
                  </NavItem>
                  <NavItem>
                    {
                    context.token !== 'null' &&
                      <NavLink 
                        href=" "
                        onClick={ () => {
                        context.logout()
                        context.token= null
                        window.location.href='/'
                      }}>
                      <i className="nc-icon nc-layout-11" /> Logout
                      </NavLink>
                    }
                  </NavItem>
                  <NavItem>                    
                    {
                    context.token === 'null' &&
                    <a href=" ">
                    <Button                      
                      className="btn-round"
                      color="warning"
                      href="/anonymousDenuncia"
                      target="_blank"
                      disabled
                    > Denuncia Anonima
                    </Button>
                    </a>}  
                  </NavItem>
                  <NavItem>                    
                    {
                    context.token !== 'null' &&
                    <a href="/createDenuncia">
                    <Button
                      className="btn-round"
                      color="success"
                      href=" "
                      target="_blank"
                      disabled
                    > Denuncia Oficial
                    </Button>
                    </a>}  
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
