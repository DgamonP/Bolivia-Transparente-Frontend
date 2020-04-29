import React, {useState} from 'react';
import errorImg from '../../assets/img/logoBSinFondo.png'
import { Container, Col, Row, Button, Media } from 'reactstrap';
import Image from 'react-bootstrap/Image'
import Modal from 'react-bootstrap/Modal'

function MydModalWithGrid(props) {
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Contactanos
                </Modal.Title>
            </Modal.Header>
        <Modal.Body>
            <Container>
                <Row className="show-grid">
                    <p>Ministerio de Gobierno</p>
                    <Col xs={6} md={12}>
                        <p>Dirección: Av. Arce esq. Belisario Salinas N° 2409 La Paz Bolivia</p>
                    </Col>
                    <Col xs={6} md={12}>
                        <p><a href="mailto:info@mingobierno.gob.bo">info@mingobierno.gob.bo</a></p>
                    </Col>
                </Row>
                    <Row className="show-grid">
                    <p>Telefonos</p>
                    </Row>
                    <Row className="show-grid">
                        <Col  md={4}>
                        <p>+591-22170200</p>
                    </Col>
                    <Col  md={4}>
                        <p>+591-22170202</p>
                    </Col>
                    <Col  md={4}>
                        <p>+591-22170203</p>
                    </Col>        
                </Row>            
                <Row className="show-grid">
                    <p>Ministerio de Transparencia</p>
                    <Col xs={6} md={12}>
                        <p>Dirección: Av. Arce esq. Belisario Salinas N° 2408</p>
                    </Col>
                    <Col xs={6} md={12}>
                        <p>NUMERO FIJO: 2170200 - Int. 2031</p>
                    </Col>
                    <Col xs={6} md={12}>
                        <p>LINEA GRATUITA: 800 10 18 19</p>
                    </Col>
                </Row>  
            </Container>
        </Modal.Body>
        <Modal.Footer>
            <Button href="/" onClick={props.onHide}>Inicio</Button>
            <Button href="/Denuncia" onClick={props.onHide} color="primary">Denuncia</Button>
        </Modal.Footer>
    </Modal>
    );
}  
function NotFound() {
    const [modalShow, setModalShow] = useState(false);  
    return (
    <>
        <div
                className="page-header"
                style={{
                backgroundImage:
                    "url(" + require("assets/img/backgroundForm.png") + ")",
                }}
                >
                    <div className="text-center">
                        <Media center href="/">
                            <Image width="350" className="rounded mx-auto d-block" src={errorImg} />
                        </Media>
                        <p className="display-1 text-light" color="with">404</p>
                        <h1 className="text-danger">Pagina no Encontrada</h1>
                        <Button className="btn round" onClick={() => setModalShow(true)} color="primary">
                            Contactanos
                        </Button>
        </div>
        </div>
        <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />
    </>
    );
} 

export default NotFound;

/* class NotFound extends React.Component{
    render(){
        return(
            <React.Fragment>
                {/* <IndexNavbar /> 
                <div
                className="page-header"
                style={{
                backgroundImage:
                    "url(" + require("assets/img/backgroundForm.png") + ")",
                }}
                >
                    <div className="text-center">
                        <Media center href="/">
                            <Image width="350" className="rounded mx-auto d-block" src={errorImg} />
                        </Media>
                        <p className="display-1 text-light" color="with">404</p>
                        <h1 className="text-danger">Pagina no Encontrada</h1>
                        <Button className="btn round" color="primary">Contactanos</Button>
                    </div>
                </div> 
            </React.Fragment>
        )
    };
}

export default NotFound; */