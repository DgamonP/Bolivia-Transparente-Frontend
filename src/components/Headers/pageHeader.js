/*eslint-disable*/
import React from "react";

// reactstrap components
//import { Container } from "reactstrap";

// core components

function PageHeader() {
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

export default PageHeader;
