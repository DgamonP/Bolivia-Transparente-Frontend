/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function IndexHeader() {
  return (
    <>
      <div
        className="page-header section-dark"
        style={{
          backgroundImage:
            "url(" + require("assets/img/antoine-barres.jpg") + ")"
        }}
      >
        <div className="filter" />
        <div className="content-center">
          <Container>
            <div className="title-brand">
              <h1 className="presentation-title">Bolivia Transparente</h1>
              {/* <div className="fog-low">
                <img alt="..." src={require("assets/img/fog-low.png")} />
              </div>
              <div className="fog-low right">
                <img alt="..." src={require("assets/img/fog-low.png")} />
              </div> */}
            </div>
            <h2 className="presentation-subtitle text-center">
              Realiza tus Denuncias en este Portal
            </h2>
          </Container>
        </div>
        <div
          className="moving-clouds"
          style={{
            backgroundImage: "url(" + require("assets/img/clouds.png") + ")"
          }}
        />
        <h6 className="category category-absolute">
          Diseñado por DeMS{" "}
          <a
            href="http://deepmicrosystems.com/"
            target="_blank"
          >
            <img
              alt="..."
              className="creative-tim-logo"
             src={require("assets/img/logoDeMS.png")}
            />
          </a>
        </h6>
      </div>
    </>
  );
}

export default IndexHeader;
