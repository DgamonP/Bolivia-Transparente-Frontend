import React from 'react';
import firebase from "firebase";
import 'react-dates/initialize';
import Step from '@material-ui/core/Step';
import 'react-dates/lib/css/_datepicker.css';
import Stepper from '@material-ui/core/Stepper';
import '../../views/pages/styles/createForm.css';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import FileUploader from "react-firebase-file-uploader";
import {createReport} from '../../api/graphql';
import videoPlaceholder from '../../images/videoPlaceholder.jpeg';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Container, Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';


function getSteps() {
  return ['Información de los hechos', '¿Donde sucedió el incidente? (Opcional)', 'Personal involucrado (Opcional)', 'Adjuntar evidencia (Opcional)', 'Envio de denuncia'];
}

function getStepContent(stepIndex) {
    switch (stepIndex) {
    case 0:
        return 'Por favor cuéntenos que sucedió';
    case 1:
        return 'Opcionalmente indique donde sucedió el incidente';
    case 2:
        return 'Opcionalmente indique que ministerio y/o personal estuvo involucrado';
    case 3:
        return 'Si fuese el caso, adjunte evidencia, imágenes, videos y audios son formatos válidos';
    case 4:
        return 'Condiciones de uso';
    default:
        return 'Índice desconocido';
    }
}

const config = {
    apiKey: "AIzaSyCb2RE1ifVk5Atyy48Jgs0LIZx6H3wLBWs",
    authDomain: "ministerio-gob-app.firebaseapp.com",
    databaseURL: "https://ministerio-gob-app.firebaseio.com",
    storageBucket: "ministerio-gob-app.appspot.com"
};

firebase.initializeApp(config);

class CreateForm extends React.Component{
    state = {
        form: {
            date                    : "2020-04-02",
            time                    : "00:00",
            title                   : "",
            description             : "",
            category                : "Corruption",
            country                 : "Bolivia",
            state                   : "Other",
            city                    : "",
            municipio               : "",
            placeName               : "",
            entity                  : "",
            denounced               : "",
            denouncedCharge         : "",
            denouncedDescription    : "",
            imagePath               : [],
            videoPath               : [],
            audioPath               : [],
            anonymousPhone          : "",
            anonymousEmail          : "",
        },
        userId          : null,
        currentPage     : 0,
        readOnly        : false,
        isUploading     : false,
        progress        : 0,
        notSupported    : false,
        networkError    : false,
        noMedia         : true,
        missingFields   : false,
        error           : null,
        viewOnly        : false
    };

    // classes = useStyles();
    steps = getSteps();

    handleNext = () => {
        let newStep = this.state.currentPage + 1;
        // console.log("Setting to new step", newStep);
        this.setState({currentPage: newStep});
    };

    handleBack = () => {
        let newStep = this.state.currentPage - 1;
        // console.log("Setting to new step", newStep);
        this.setState({currentPage: newStep});
    };

    handleReset = () => {
        this.setState({currentPage: 0});
    };

    async componentDidMount(){
        // First check for local storage variables:
        let auxiliarUserId  = window.localStorage.getItem('id');
        let stringEvent     = window.localStorage.getItem("event");
        console.log("Received string event:",stringEvent);
        if(stringEvent){
            // If there is an event saved we work to display this information
            let myEvent         = JSON.parse(stringEvent);
            var splitResult     = myEvent.date.split("T");
            var formatedDate    = splitResult[0];
            var formatedTime    = splitResult[1].split(".")[0];
            console.log("Split result:",formatedDate,formatedTime);
            myEvent.date        = formatedDate;
            myEvent.time        = formatedTime;
            console.log("Final result json:",myEvent)
            this.setState({form:myEvent, userId: auxiliarUserId, viewOnly: true});
            stringEvent     = window.localStorage.removeItem("event");
        }
        else{
            // If not, we set the parameters to the default values
            var myDate = new Date();
            let isoString = myDate.toISOString();
            let minute = myDate.getMinutes();
            let hour = myDate.getHours();
            minute = "" + minute;
            hour = "" + hour;
            
            if(minute.length===1) minute = `0${minute}`;
            if(hour.length===1)   hour   = `0${hour}`
            
            var currentDate = isoString.slice(0,10);
            var currentTime = hour + ":" + minute;
            console.log("Old date time to:", this.state.form.date, this.state.form.time);
            console.log("Setting date time to:", currentDate, currentTime);
            this.setState({
                form:{
                    ...this.state.form,
                    date: currentDate,
                    time: currentTime
                },
                userId: auxiliarUserId
            });
        }
    }

    // updatePage = newPage => {
    //     // console.log("Setting step to", newPage)
    //     this.setState({currentPage: newPage});
    // }

    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
            missingFields:false,
        });
    };

    deleteAll = () =>{
        this.setState({form:{
            ...this.state.form,
            imagePath : [], videoPath : [], audioPath: [],
            noMedia:true}})
    }

    handleClick = async e => {
        if(this.state.form.title === "" || this.state.form.description === ""){
            this.setState({missingFields:true}) 
        }
        else{
            console.log('Title');
            console.log(this.state.form.title);
            let isAnonymous = "";
            if(!this.state.userId){
                isAnonymous = "true";
            }
            let dummyProofTime = this.state.form.time;
            if (this.state.form.time.length !== 5){
                dummyProofTime = "00:00";
            }
            createReport(this.state.form.date,
                        dummyProofTime,
                        this.state.form.title,
                        this.state.form.description,
                        this.state.form.category,
                        this.state.form.country,
                        this.state.form.state,
                        this.state.form.city,
                        this.state.form.municipio,
                        this.state.form.placeName,
                        0.0,
                        0.0,
                        this.state.form.entity,
                        this.state.form.denounced,
                        this.state.form.denouncedCharge,
                        this.state.form.denouncedDescription,
                        this.state.form.imagePath,
                        this.state.form.videoPath,
                        this.state.form.audioPath,
                        isAnonymous,
                        this.state.form.anonymousPhone,
                        this.state.form.anonymousEmail,
                        )
            .then(result=>{
                console.log("Create Event result:");
                console.log(result);
                window.localStorage.setItem("folio", result.folio);
                this.props.redirect()
            }).catch(error=>{
                this.setState({error:error})
            });
        }
    }

    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };

    handleProgress = progress => this.setState({ progress });

    handleUploadStart = () => { console.log("Started upload");
                                this.setState({ isUploading: true, progress: 0 })};
    
    _removeImage = (urlToRemove) =>{
        // console.log(this.state.form.imagePath);
        // let newList = this.state.form.imagePath.splice(this.state.form.imagePath.indexOf(urlToRemove),1);
        // this.setState({form:{...this.state.form,imagePath:newList}});
        
        // console.log("After:");
        // console.log(this.state.form.imagePath);
    }

    _removeVideo = (urlToRemove) =>{
        // let newList = this.state.form.videoPath.splice(this.state.form.videoPath.indexOf(urlToRemove),1);
        // this.setState({form:{...this.state.form,videoPath:newList}});
        // console.log(this.state.form.videoPath);
    }

    _removeAudio = (urlToRemove) =>{
    }

    _isAudio = filename => {
        return filename.includes(".mp3") || filename.includes(".ogg");
    };

    _isVideo = filename => {
        return filename.includes(".mp4") || filename.includes(".avi");
    };

    _isImage = filename => {
        return filename.includes(".jpeg") || filename.includes(".png") || filename.includes(".jpg");
    };

    _isSupported = filename => {
        return this._isVideo(filename) || this._isImage(filename) || this._isAudio(filename);
    }

    handleUploadSuccess = filename => {
        console.log("Successfully added file");
        let hasNoMedia = !(this.state.form.imagePath || this.state.form.videoPath);
        this.setState({progress: 100, isUploading: false, noMedia: hasNoMedia });
        if (this._isSupported(filename)){
            this.setState({notSupported:false})
            if(this._isImage(filename)){
                firebase
                    .storage()
                    .ref("images")
                    .child(filename)
                    .getDownloadURL()
                    .then(url => {
                        var  myImageList = this.state.form.imagePath;
                        myImageList.push(url);
                        this.setState({ form:{
                            ...this.state.form,
                            imagePath: myImageList} });
                        console.log(this.state.form);
                        console.log("Finished uploading image to:",url);
                    });
            }
            else{
                if(this._isVideo(filename)){
                    firebase
                        .storage()
                        .ref("images")
                        .child(filename)
                        .getDownloadURL()
                        .then(url => {
                            var  myVideoList = this.state.form.videoPath;
                            myVideoList.push(url);
                            this.setState({form:{
                                ...this.state.form,
                                videoPath: myVideoList }});
                            console.log(this.state.form);
                            console.log("Finished uploading video to:", url);
                        });
                }
                else{
                    if(this._isAudio(filename)){
                        console.log("Uploading audio",filename);
                        firebase
                            .storage()
                            .ref("images")
                            .child(filename)
                            .getDownloadURL()
                            .then(url => {
                                console.log("Uploaded audio");
                                var  myAudioList = this.state.form.audioPath;
                                myAudioList.push(url);
                                this.setState({form:{
                                    ...this.state.form,
                                    audioPath: myAudioList }});
                                console.log(this.state.form);
                                console.log("Finished uploading audio to:", url);
                            });
                    }
                }
            }
        }
        else{
            this.setState({notSupported:true})
        }
    }

    render(){
        // console.log("Building for page", this.state.currentPage);
        return(
        <React.Fragment>
            <div className="page"
                 /* className="page-header"  */
                style={{
                backgroundImage:
                    "url(" + require("assets/img/backre.png") + ")",
                }}
            >
            <div>
                <br/><br/><br/><br/>
            <h1 className="text-center text-light"  hidden={this.state.viewOnly}> Nueva Denuncia</h1>
            <h1 className="text-center text-light" style={{padding:8}} hidden={!this.state.viewOnly}> Formulario de Denuncia</h1>
            {/* <h3 className="text-center text-light" style={{padding:8}} hidden={this.state.viewOnly}> view Denuncia</h3>
             */}
            <Stepper hidden={this.state.viewOnly} activeStep={this.state.currentPage} alternativeLabel style={{backgroundColor:"transparent"}}>
                {this.steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
            
            {/* <form >
                <div > */}
                <Container>
                <Form className ="text-white" onSubmit = {this.handleSubmit}> 
                    <Row>   
                        <Col md={6}>
                        <FormGroup>
                            <Label hidden={!this.state.viewOnly && this.state.currentPage!==0}>Fecha del incidente </Label>
                            <Input disabled    = {this.state.viewOnly}
                                    hidden      = {!this.state.viewOnly && this.state.currentPage!==0}
                                    id          = "date_input"
                                    placeholder = "Ingrese la fecha del incidente"   
                                    margin      = "normal"
                                    onChange    = {this.handleChange}
                                    className   = "form-control"
                                    type        = "date"
                                    name        = "date"
                                    value       = {this.state.form.date} />
                        </FormGroup>
                        </Col>
                        <Col md={6}>
                        <FormGroup>
                            <Label hidden={!this.state.viewOnly && this.state.currentPage!==0}>Hora del incidente (opcional) </Label>
                            <Input disabled    = {this.state.viewOnly}
                                hidden      = {!this.state.viewOnly && this.state.currentPage!==0}
                                id          = "time_input"
                                placeholder = "Ingrese la fecha del incidente"   
                                margin      = "normal"
                                onChange    = {this.handleChange}
                                className   = "form-control"
                                type        = "time"
                                name        = "time"
                                value       = {this.state.form.time} />
                        </FormGroup>
                        </Col>
                    </Row>                   
                        <FormGroup>
                                <Label hidden={!this.state.viewOnly && this.state.currentPage!==0}>Titulo </Label>
                                <Input disabled    = {this.state.viewOnly}
                                        hidden      = {!this.state.viewOnly && this.state.currentPage!==0}
                                        id          = "title_input"
                                        placeholder = "En pocas palabras ingrese un título para el hecho"   
                                        margin      = "normal"
                                        onChange    = {this.handleChange}
                                        className   = "form-control"
                                        type        = "text"
                                        name        = "title"
                                        value       = {this.state.form.title}/>
                        </FormGroup>
                        <FormGroup>
                            <Label hidden={!this.state.viewOnly && this.state.currentPage!==0}>Descripción </Label>
                                <Input disabled    = {this.state.viewOnly}
                                    hidden      = {!this.state.viewOnly && this.state.currentPage!==0}
                                    style       = {{paddingBottom:24, paddingRight: 24, paddingLeft: 24}}
                                    id          = "description_id"
                                    placeholder = "De la forma más detallada posible cuéntenos que sucedió"   
                                    margin      = "normal"
                                    onChange    = {this.handleChange}
                                    className   = "form-control"
                                    type        = "textarea"
                                    name        = "description"
                                    value       = {this.state.form.description}/>
                        </FormGroup>  
                    <Row>   
                        <Col md={6}>
                        <FormGroup>
                            <Label hidden={!this.state.viewOnly && this.state.currentPage!==1}>Departamento </Label>
                            <Input type="select" 
                                    disabled    = {this.state.viewOnly}
                                    hidden      = {!this.state.viewOnly && this.state.currentPage!==1}
                                    value       = {this.state.form.state}
                                    name        = "state"
                                    onChange    = {this.handleChange}>
                                    <option value="Other">Otro</option>
                                    <option value="La Paz">La Paz</option>
                                    <option value="Cochabamba">Cochabamba</option>
                                    <option value="Santa Cruz">Santa Cruz</option>
                                    <option value="Oruro">Oruro</option>
                                    <option value="Potosí">Potosí</option>
                                    <option value="Tarija">Tarija</option>
                                    <option value="Chuquisaca">Chuquisaca</option>
                                    <option value="Beni">Beni</option>
                                    <option value="Pando">Pando</option>
                                    </Input>
                        </FormGroup>
                        </Col>
                        <Col md={6}>
                        <FormGroup>
                            <Label hidden={!this.state.viewOnly && this.state.currentPage!==1}>Ciudad </Label>
                            <Input disabled    = {this.state.viewOnly}
                                    hidden      = {!this.state.viewOnly && this.state.currentPage!==1}
                                    id          = "city"
                                    placeholder = "¿En que ciudad sucedió el evento?. Ejemplo, El Alto, Quillacollo, Montero, etc"
                                    margin      = "normal"
                                    onChange    = {this.handleChange}
                                    className   = "form-control"
                                    type        = "text"
                                    name        = "city"
                                    value       = {this.state.form.city}/>
                        </FormGroup>
                        </Col>
                    </Row>    
                    <Row>   
                        <Col md={6}>
                        <FormGroup>
                            <Label hidden={!this.state.viewOnly && this.state.currentPage!==1}>Municipio </Label>
                            <Input disabled    = {this.state.viewOnly}
                                    hidden      = {!this.state.viewOnly && this.state.currentPage!==1}
                                    id          = "municipio"
                                    placeholder = "¿En que municipio sucedió el evento?. Ejemplo, Cercado, etc"
                                    margin      = "normal"
                                    onChange    = {this.handleChange}
                                    className   = "form-control"
                                    type        = "text"
                                    name        = "municipio"
                                    value       = {this.state.form.municipio}/>
                        </FormGroup>
                        </Col>
                        <Col md={6}>
                        <FormGroup>
                            <Label hidden={!this.state.viewOnly && this.state.currentPage!==1}>Dirección del incidente </Label>
                            <Input disabled    = {this.state.viewOnly}
                                    hidden      = {!this.state.viewOnly && this.state.currentPage!==1}
                                    id          = "location_id"
                                    placeholder = "Dónde sucedió el acontecimiento, por favor sea lo más descriptivo posible"
                                    margin      = "normal"
                                    onChange    = {this.handleChange}
                                    className   = "form-control"
                                    type        = "text"
                                    name        = "placeName"
                                    value       = {this.state.form.placeName}
                                    />
                        </FormGroup>
                        </Col>
                    </Row>
                    <Row>   
                        <Col md={12}>
                        <FormGroup>
                            <Label hidden={!this.state.viewOnly && this.state.currentPage!==1}>Entidad u organización involucrada</Label>
                            <Input disabled    = {this.state.viewOnly}
                                    hidden      = {!this.state.viewOnly && this.state.currentPage!==1}
                                    id          = "entity"
                                    placeholder = "Indique en que organización o entidad ocurrió el acto denunciado"
                                    margin      = "normal"
                                    onChange    = {this.handleChange}
                                    className   = "form-control"
                                    type        = "text"
                                    name        = "entity"
                                    value       = {this.state.form.entity}
                                    />
                        </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                        <FormGroup>
                            <Label hidden={!this.state.viewOnly && this.state.currentPage!==2}>Nombre de la persona denunciada </Label>
                            <Input disabled    = {this.state.viewOnly}
                                    hidden      = {!this.state.viewOnly && this.state.currentPage!==2}
                                    id          = "denounced"
                                    placeholder = "Si cuenta con los nombres de la(s) persona(s) o funcionario(s) denunciado(s), introdúzcalo(s)"
                                    margin      = "normal"
                                    onChange    = {this.handleChange}
                                    className   = "form-control"
                                    type        = "text"
                                    name        = "denounced"
                                    value       = {this.state.form.denounced}
                                    />
                        </FormGroup>
                        </Col>
                        <Col md={6}>
                        <FormGroup>
                            <Label hidden={!this.state.viewOnly && this.state.currentPage!==2}>Cargo de la persona denunciada</Label>
                            <Input disabled    = {this.state.viewOnly}
                                    hidden      = {!this.state.viewOnly && this.state.currentPage!==2}
                                    id          = "denouncedCharge"
                                    placeholder = "Si conoce el cargo de la(s) persona(s) o funcionario(s) denunciado(s), introdúzcalo(s)"
                                    margin      = "normal"
                                    onChange    = {this.handleChange}
                                    className   = "form-control"
                                    type        = "text"
                                    name        = "denouncedCharge"
                                    value       = {this.state.form.denouncedCharge}
                                    />
                        </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                    <Col md={12}> 
                        <FormGroup>
                            <Label hidden={!this.state.viewOnly && this.state.currentPage!==2}>Descripción de la persona denunciada </Label>
                            <Input disabled    = {this.state.viewOnly}
                                    hidden      = {!this.state.viewOnly && this.state.currentPage!==2}
                                    id          = "denouncedDescription"
                                    placeholder = "De no contar con el nombre o cargo puede proceder a describir a la persona o personas denunciadas"
                                    margin      = "normal"
                                    onChange    = {this.handleChange}
                                    className   = "form-control"
                                    type        = "textarea"
                                    name        = "denouncedDescription"
                                    value       = {this.state.form.denouncedDescription}
                                    />
                        </FormGroup>
                    </Col>
                    </Row> 
                    <div align="center" style={{paddingLeft: 24, paddingRigth: 24}}  hidden={!this.state.viewOnly && this.state.currentPage!==3}>
                        {this.state.isUploading && <CircularProgress variant="determinate" value={this.state.progress} />}
                    </div>
                    <div className = "form-group" align="center" hidden={this.state.viewOnly || this.state.currentPage!==3}>
                        <label style={{paddingRight: 24, paddingLeft: 24}}> Si desea adjuntar evidencia puede realizarlo a continuación:</label>
                        <br/>
                        <div style={{paddingTop: 24, paddingRight: 24, paddingLeft: 24}}>
                            <label style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer'}}>
                                Seleccione un archivo 
                                <FileUploader
                                    hidden
                                    accept          = "image/video/audio"
                                    storageRef      = {firebase.storage().ref('images')}
                                    onUploadStart   = {this.handleUploadStart}
                                    onUploadError   = {this.handleUploadError}
                                    onUploadSuccess = {this.handleUploadSuccess}
                                    onProgress      = {this.handleProgress}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center" hidden={!this.state.viewOnly && this.state.currentPage!==3}>
                        {this.state.form.imagePath.map(currentUrl=>{
                            // Not working: onClick={() => {this._removeImage(currentUrl)}} 
                            return(<div onClick={() => {this._removeImage(currentUrl)}} className="d-flex justify-content-center" key={currentUrl}>
                                {currentUrl && <img src={currentUrl} width="200px" height="200px" alt="upImage"/>}
                                {false && currentUrl && <p className="legend">currentUrl</p>}
                                
                            </div>);
                        })}
                    </div>
                    <div className="d-flex justify-content-center" hidden={!this.state.viewOnly && this.state.currentPage!==3}>
                        {this.state.form.videoPath.map(currentUrl=>{
                            // Not working: onClick={() => {this._removeVideo(currentUrl)}} 
                            return(<div onClick={() => {this._removeVideo(currentUrl)}}  className="d-flex justify-content-center" key={currentUrl}>
                                {currentUrl && <img src={videoPlaceholder} width="200px" alt="upVideo"/>}
                                {false && currentUrl && <p className="legend">currentUrl</p>}
                            </div>);
                        })}
                    </div>
                    <div className="d-flex justify-content-center" hidden={!this.state.viewOnly && this.state.currentPage!==3}>
                        {this.state.form.audioPath.map(currentUrl=>{
                            // Not working: onClick={() => {this._removeAudio(currentUrl)}} 
                            return(<div onClick={() => {this._removeAudio(currentUrl)}}  className="d-flex justify-content-center" key={currentUrl}>
                                {currentUrl &&  <audio controls>
                                        <source src={currentUrl} type="audio/mpeg"/>
                                        {"Archivo de audio: "+currentUrl}
                                    </audio> }
                                {false && currentUrl && <p className="legend">currentUrl</p>}
                            </div>);
                        })}
                    </div>
                    <Row>
                        <Col md={6}>
                        <FormGroup>
                            <Label hidden={(!this.state.viewOnly && this.state.currentPage!==4) || this.state.userId}>Teléfono de contacto </Label>
                            <Input disabled    = {this.state.viewOnly}
                                    hidden      = {(!this.state.viewOnly && this.state.currentPage!==4) || this.state.userId}
                                    id          = "anonymousPhone"
                                    placeholder = "Introduzca un telefono para contactarlo"
                                    margin      = "normal"
                                    onChange    = {this.handleChange}
                                    className   = "form-control"
                                    type        = "text"
                                    name        = "anonymousPhone"
                                    value       = {this.state.form.anonymousPhone}
                                    />
                        </FormGroup>
                        </Col>
                        <Col md={6}>
                        <FormGroup>
                            <Label hidden={(!this.state.viewOnly && this.state.currentPage!==4) || this.state.userId}>Correo de contacto</Label>
                            <Input disabled    = {this.state.viewOnly}
                                    hidden      = {(!this.state.viewOnly && this.state.currentPage!==4) || this.state.userId}
                                    id          = "anonymousEmail"
                                    placeholder = "Introduzca un correo electrónico para contactarlo"
                                    margin      = "normal"
                                    onChange    = {this.handleChange}
                                    className   = "form-control"
                                    type        = "text"
                                    name        = "anonymousEmail"
                                    value       = {this.state.form.anonymousEmail}
                                    />
                        </FormGroup>
                        </Col>
                    </Row>
                    <p className="text" align="center" hidden={this.state.viewOnly || this.state.currentPage!==4}> Al utilizar el sistema usted acepta las condiciones de uso del mismo. <br/> Su información será utilizada de forma estrictamente confidencial.</p>
                <div align="center" hidden={this.state.viewOnly || this.state.currentPage!==3}>
                    {!this.state.noMedia && <Button color="danger" type="button" onClick={this.deleteAll} size="small" target="_blank">
                        Eliminar todo
                    </Button>}
                </div>
                <div align="center" style={{paddingLeft: 24, paddingRigth: 24}} hidden={!this.state.viewOnly && this.state.currentPage!==4}>
                    {this.state.missingFields && <div className="alert alert-warning"> Título y descripción son campos obligatorios </div>}
                </div>
                <div align="center" style={{paddingLeft: 24, paddingRigth: 24}} hidden={!this.state.viewOnly && this.state.currentPage!==4}>
                    {this.state.error && <div className="alert alert-danger"> Ocurrio un error, por favor inténtelo más tarde </div>}
                </div>
                <div align="center" hidden={this.state.viewOnly || this.state.currentPage!==4}>
                    <Button color="success" type="button" onClick={this.handleClick} size="medium" target="_blank">
                        Enviar Denuncia
                    </Button>
                </div>
                <div className="centered-component" hidden={this.state.viewOnly}>
                    <Typography className="centered-component">{getStepContent(this.state.currentPage)}</Typography>
                    <div className="centered-component">
                    <Button
                        className="btn-round"
                        color="secondary"
                        disabled  = {this.state.currentPage === 0}
                        onClick   = {this.handleBack}
                        // className = {this.classes.backButton}
                    >
                        Anterior
                    </Button>
                    <Button
                        className="btn-round"
                        color="primary"
                        disabled  = {this.state.currentPage === this.steps.length-1}
                        onClick   = {this.handleNext}>
                        Siguiente
                    </Button>
                    </div>
                </div>
            </Form>
            </Container>
            </div>
            
        </div>
        </React.Fragment>);
    }
}

export default CreateForm;