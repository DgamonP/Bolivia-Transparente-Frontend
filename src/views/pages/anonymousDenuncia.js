import React, { useState } from "react";

//import CreateForm from "../../components/comp-forms/createForm";
//import AuthContext from './context/auth-context';
import IndexNavbar from "../../components/Navbars/IndexNavbar.js";
import Form from "react-bootstrap/Form";

const AnonymousDenuncia = () => {
  const [token, setToken] = useState(null);

  return (
    <React.Fragment>
      <IndexNavbar />
      <div
        className="page-header"
        style={{
          backgroundImage:
            "url(" + require("assets/img/backgroundForm.png") + ")",
        }}
      >
        <div>
          <Form>
            <Form.File
              id="custom-file-translate-scss"
              label="Custom file input"
              lang="en"
              custom
            />
          </Form>
          <Form>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Realizar denuncia anonima"
            />
          </Form>
        </div>
      </div>    
      <h5>Ministerio de Tranparencia</h5>
    </React.Fragment>
  );
};

export default AnonymousDenuncia;
