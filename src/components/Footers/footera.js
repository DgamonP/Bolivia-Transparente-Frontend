import React from 'react';
import './footera.css';

class Footer extends React.Component{
    render(){
        return <div className="footer-container">
            <div className="footer-item">
                <span className="font-weight-bold">Contacto:</span>
                <br/>
                <span className="font-weight-light">Dirección: Av. Arce esq. Belisario Salinas N° 2409 La Paz Bolivia</span>
                <br/>
                <span className="font-weight-bold">Correo Electrónico:</span>
                <br/>
                <span className="font-weight-light"><a href="mailto:info@mingobierno.gob.bo">info@mingobierno.gob.bo</a></span>
            </div>
            <div className="footer-item">
                <span className="font-weight-bold">Teléfonos</span>
                <br/>
                <span className="font-weight-light">(+591-2)2170200</span>
                <br/>
                <span className="font-weight-light">(+591-2)2120002</span>
                <br/>
                <span className="font-weight-light">(+591-2)2120003</span>
            </div>
            <div className="footer-item">
                <span className="font-weight-bold">Transparencia</span>
                <br/>
                <span className="font-weight-light">LINEA GRATUITA: 800 10 18 19</span>
                <br/>
                <span className="font-weight-light">NUMERO FIJO: 2170200 - Int. 2031</span>
                <br/>
                <span className="font-weight-light">Dirección: Av. Arce esq. Belisario Salinas N° 2408 La Paz Bolivia</span>
            </div>
        </div>
    };
}

export default Footer;