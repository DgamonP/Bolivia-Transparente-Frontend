import React from 'react';
import firebase from "firebase";
import 'react-dates/initialize';
import Step from '@material-ui/core/Step';
import 'react-dates/lib/css/_datepicker.css';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Stepper from '@material-ui/core/Stepper';
// import Stepper from '../../components/stepper';
import '../../views/pages/styles/createForm.css';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FileUploader from "react-firebase-file-uploader";
import {createReport, getEvent} from '../../api/graphql';
import videoPlaceholder from '../../images/videoPlaceholder.jpeg';
import CircularProgress from '@material-ui/core/CircularProgress';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//   },
//   backButton: {
//     marginRight: theme.spacing(1),
//   },
//   instructions: {
//     marginTop: theme.spacing(1),
//     marginBottom: theme.spacing(1),
//   },
// }));

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
        displayForm     : undefined
    };

    // classes = useStyles();
    steps = getSteps();

    handleNext = () => {
        let newStep = this.state.currentPage + 1;
        console.log("Setting to new step",newStep);
        this.setState({currentPage: newStep});
    };

    handleBack = () => {
        let newStep = this.state.currentPage - 1;
        console.log("Setting to new step",newStep);
        this.setState({currentPage: newStep});
    };

    handleReset = () => {
        this.setState({currentPage: 0});
    };

    // constructor(props){
    //     super(props);
    //     console.log("Constructor has videos");
    //     console.log(this.state.form.videoPath);
    // }

    async componentDidMount(){
        let auxiliarUserId = window.localStorage.getItem('id');
        if(this.props.display){
            // console.log("Setting display to: ", this.props.display);
            this.setState({displayForm: this.props.display});
            var myEvent = await getEvent(window.localStorage.getItem('id'), this.props.display);
            // console.log("Setting:",myEvent," to: ",this.state.form);
            // Reconstructing date and time from ISO format:
            var splitResult = myEvent.date.split("T");
            // console.log("Recovered datetime:",splitResult);
            var formatedDate = splitResult[0];
            var formatedTime = splitResult[1].split(".")[0];
            console.log("Split result:",formatedDate,formatedTime);
            myEvent.date=formatedDate;
            myEvent.time=formatedTime;
            console.log("Final result json:",myEvent)
            this.setState({form:myEvent, userId: auxiliarUserId});
        }
        else{
            this.setState({userId: auxiliarUserId});
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
            createReport(this.state.form.date,
                        this.state.form.time,
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
        console.log("Building for page", this.state.currentPage);
        return(
        <React.Fragment>
            <h1 style={{padding:24}}> Nueva Denuncia</h1>
            {/* <Stepper udpatePage={this.updatePage} hidden={this.props.display}/> */}
            <Stepper activeStep={this.state.currentPage} alternativeLabel style={{backgroundColor:"transparent"}}>
                {this.steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
            <form onSubmit = {this.handleSubmit}>
                <div>
                    <div className="flex-container">
                        <div className="flex-item-two-row">
                            <label hidden={!this.props.display && this.state.currentPage!==0}>Fecha del incidente *</label>
                            <TextField
                                hidden      = {!this.props.display && this.state.currentPage!==0}
                                id          = "date_input"
                                placeholder = "Ingrese la fecha del incidente"   
                                margin      = "normal"
                                onChange    = {this.handleChange}
                                className   = "form-control"
                                type        = "date"
                                name        = "date"
                                value       = {this.state.form.date}
                                />
                        </div>
                        <div className="flex-item-two-row">
                            <label hidden={!this.props.display && this.state.currentPage!==0}>Hora del incidente (opcional)</label>
                            <TextField
                                hidden      = {!this.props.display && this.state.currentPage!==0}
                                id          = "time_input"
                                placeholder = "Ingrese la fecha del incidente"   
                                margin      = "normal"
                                onChange    = {this.handleChange}
                                className   = "form-control"
                                type        = "time"
                                name        = "time"
                                value       = {this.state.form.time}
                                />
                        </div>
                    </div>
                </div>
                <div className = "form-group">
                    <label style={{paddingRight: 24, paddingLeft: 24}} hidden={!this.props.display && this.state.currentPage!==0}>Título</label>
                    <TextField
                        hidden      = {!this.props.display && this.state.currentPage!==0}
                        style       = {{paddingBottom:24, paddingRight: 24, paddingLeft: 24}}
                        id          = "title_input"
                        placeholder = "En pocas palabras ingrese un título para el hecho"   
                        margin      = "normal"
                        onChange    = {this.handleChange}
                        className   = "form-control"
                        type        = "text"
                        name        = "title"
                        value       = {this.state.form.title}
                        />
                </div>
                <div className = "form-group">
                    <label style={{paddingRight: 24, paddingLeft: 24}} hidden={!this.props.display && this.state.currentPage!==0}>Descripción</label>
                    <TextField
                        hidden      = {!this.props.display && this.state.currentPage!==0}
                        style       = {{paddingBottom:24, paddingRight: 24, paddingLeft: 24}}
                        id          = "description_id"
                        placeholder = "De la forma más detallada posible cuéntenos que sucedió"   
                        margin      = "normal"
                        onChange    = {this.handleChange}
                        className   = "form-control"
                        type        = "text"
                        name        = "description"
                        value       = {this.state.form.description}
                        />
                </div>
                <div className          = "form-group">
                    <label style        = {{paddingRight: 24, paddingLeft: 24}} hidden      = {!this.props.display && this.state.currentPage!==1}>Departamento</label>
                    <Select hidden      = {!this.props.display && this.state.currentPage!==1}
                            style       = {{paddingBottom:16, paddingRight: 16, paddingLeft: 16}}
                            value       = {this.state.form.state}
                            name        = "state"
                            onChange    = {this.handleChange}>
                        <MenuItem value="Other">Otro</MenuItem>
                        <MenuItem value="La Paz">La Paz</MenuItem>
                        <MenuItem value="Cochabamba">Cochabamba</MenuItem>
                        <MenuItem value="Santa Cruz">Santa Cruz</MenuItem>
                        <MenuItem value="Oruro">Oruro</MenuItem>
                        <MenuItem value="Potosí">Potosí</MenuItem>
                        <MenuItem value="Tarija">Tarija</MenuItem>
                        <MenuItem value="Chuquisaca">Chuquisaca</MenuItem>
                        <MenuItem value="Beni">Beni</MenuItem>
                        <MenuItem value="Pando">Pando</MenuItem>
                    </Select>
                </div>
                <div className = "form-group">
                    <label style={{paddingRight: 24, paddingLeft: 24}} hidden={!this.props.display && this.state.currentPage!==1}>Ciudad</label>
                    <TextField
                        hidden      = {!this.props.display && this.state.currentPage!==1}
                        style       = {{paddingBottom:24, paddingRight: 24, paddingLeft: 24}}
                        id          = "city"
                        placeholder = "¿En que ciudad sucedió el evento?. Ejemplo, El Alto, Quillacollo, Montero, etc"
                        margin      = "normal"
                        onChange    = {this.handleChange}
                        className   = "form-control"
                        type        = "text"
                        name        = "city"
                        value       = {this.state.form.city}
                        />
                </div>
                <div className = "form-group">
                    <label style={{paddingRight: 24, paddingLeft: 24}} hidden={!this.props.display && this.state.currentPage!==1}>Municipio</label>
                    <TextField
                        hidden      = {!this.props.display && this.state.currentPage!==1}
                        style       = {{paddingBottom:24, paddingRight: 24, paddingLeft: 24}}
                        id          = "municipio"
                        placeholder = "¿En que municipio sucedió el evento?. Ejemplo, Cercado, etc"
                        margin      = "normal"
                        onChange    = {this.handleChange}
                        className   = "form-control"
                        type        = "text"
                        name        = "municipio"
                        value       = {this.state.form.municipio}
                        />
                </div>
                <div className = "form-group">
                    <label style={{paddingRight: 24, paddingLeft: 24}} hidden={!this.props.display && this.state.currentPage!==1}>Dirección del incidente</label>
                    <TextField
                        hidden      = {!this.props.display && this.state.currentPage!==1}
                        style       = {{paddingBottom:24, paddingRight: 24, paddingLeft: 24}}
                        id          = "location_id"
                        placeholder = "Dónde sucedió el acontecimiento, por favor sea lo más descriptivo posible"
                        margin      = "normal"
                        onChange    = {this.handleChange}
                        className   = "form-control"
                        type        = "text"
                        name        = "placeName"
                        value       = {this.state.form.placeName}
                        />
                </div>

                <div className = "form-group">
                    <label style={{paddingRight: 24, paddingLeft: 24}} hidden={!this.props.display && this.state.currentPage!==2}>Entidad u organización involucrada</label>
                    <TextField
                        hidden      = {!this.props.display && this.state.currentPage!==2}
                        style       = {{paddingBottom:24, paddingRight: 24, paddingLeft: 24}}
                        id          = "entity"
                        placeholder = "Indique en que organización o entidad ocurrió el acto denunciado"
                        margin      = "normal"
                        onChange    = {this.handleChange}
                        className   = "form-control"
                        type        = "text"
                        name        = "entity"
                        value       = {this.state.form.entity}
                        />
                </div>

                <div className = "form-group">
                    <label style={{paddingRight: 24, paddingLeft: 24}} hidden={!this.props.display && this.state.currentPage!==2}>Nombre de la persona denunciada</label>
                    <TextField
                        hidden      = {!this.props.display && this.state.currentPage!==2}
                        style       = {{paddingBottom:24, paddingRight: 24, paddingLeft: 24}}
                        id          = "denounced"
                        placeholder = "Si cuenta con los nombres de la(s) persona(s) o funcionario(s) denunciado(s), introdúzcalo(s)"
                        margin      = "normal"
                        onChange    = {this.handleChange}
                        className   = "form-control"
                        type        = "text"
                        name        = "denounced"
                        value       = {this.state.form.denounced}
                        />
                </div>

                <div className = "form-group">
                    <label style={{paddingRight: 24, paddingLeft: 24}} hidden={!this.props.display && this.state.currentPage!==2}>Cargo de la persona denunciada</label>
                    <TextField
                        hidden      = {!this.props.display && this.state.currentPage!==2}
                        style       = {{paddingBottom:24, paddingRight: 24, paddingLeft: 24}}
                        id          = "denouncedCharge"
                        placeholder = "Si conoce el cargo de la(s) persona(s) o funcionario(s) denunciado(s), introdúzcalo(s)"
                        margin      = "normal"
                        onChange    = {this.handleChange}
                        className   = "form-control"
                        type        = "text"
                        name        = "denouncedCharge"
                        value       = {this.state.form.denouncedCharge}
                        />
                </div>

                <div className = "form-group">
                    <label style={{paddingRight: 24, paddingLeft: 24}} hidden={!this.props.display && this.state.currentPage!==2}>Descripción de la persona denunciada</label>
                    <TextField
                        hidden      = {!this.props.display && this.state.currentPage!==2}
                        style       = {{paddingBottom:24, paddingRight: 24, paddingLeft: 24}}
                        id          = "denouncedDescription"
                        placeholder = "De no contar con el nombre o cargo puede proceder a describir a la persona o personas denunciadas"
                        margin      = "normal"
                        onChange    = {this.handleChange}
                        className   = "form-control"
                        type        = "text"
                        name        = "denouncedDescription"
                        value       = {this.state.form.denouncedDescription}
                        />
                </div>
                
                {/* <div align="center" style={{paddingLeft: 24, paddingRigth: 24}}>
                    {this.state.isUploading && <div className="alert alert-primary"> Progress: {this.state.progress} </div>}
                </div> */}
                <div align="center" style={{paddingLeft: 24, paddingRigth: 24}}  hidden={!this.props.display && this.state.currentPage!==3}>
                    {this.state.isUploading && <CircularProgress variant="determinate" value={this.state.progress} />}
                </div>
                <div className = "form-group" align="center" hidden={!this.props.display && this.state.currentPage!==3}>
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
                <div className="flex-container" hidden={!this.props.display && this.state.currentPage!==3}>
                    {this.state.form.imagePath.map(currentUrl=>{
                        // Not working: onClick={() => {this._removeImage(currentUrl)}} 
                        return(<div onClick={() => {this._removeImage(currentUrl)}} className="flex-item" key={currentUrl}>
                            {currentUrl && <img src={currentUrl} style={{padding: 24}} width="320px"/>}
                            {false && currentUrl && <p className="legend">currentUrl</p>}
                            
                        </div>);
                    })}
                </div>
                <div className="flex-container" hidden={!this.props.display && this.state.currentPage!==3}>
                    {this.state.form.videoPath.map(currentUrl=>{
                        // Not working: onClick={() => {this._removeVideo(currentUrl)}} 
                        return(<div onClick={() => {this._removeVideo(currentUrl)}}  className="flex-item" key={currentUrl}>
                            {currentUrl && <img src={videoPlaceholder} style={{padding: 24}} width="320px"/>}
                            {false && currentUrl && <p className="legend">currentUrl</p>}
                        </div>);
                    })}
                </div>
                <div className="flex-container" hidden={!this.props.display && this.state.currentPage!==3}>
                    {this.state.form.audioPath.map(currentUrl=>{
                        // Not working: onClick={() => {this._removeAudio(currentUrl)}} 
                        return(<div onClick={() => {this._removeAudio(currentUrl)}}  className="flex-item" key={currentUrl}>
                            {currentUrl &&  <audio controls>
                                    <source src={currentUrl} type="audio/mpeg"/>
                                    {"Archivo de audio: "+currentUrl}
                                </audio> }
                            {false && currentUrl && <p className="legend">currentUrl</p>}
                        </div>);
                    })}
                </div>
                <div className = "form-group">
                    <label style={{paddingRight: 24, paddingLeft: 24}} hidden={(!this.props.display && this.state.currentPage!==4) || this.state.userId}>Teléfono de contacto</label>
                    <TextField
                        hidden      = {(!this.props.display && this.state.currentPage!==4) || this.state.userId}
                        style       = {{paddingBottom:24, paddingRight: 24, paddingLeft: 24}}
                        id          = "anonymousPhone"
                        placeholder = "Introduzca un telefono para contactarlo"
                        margin      = "normal"
                        onChange    = {this.handleChange}
                        className   = "form-control"
                        type        = "text"
                        name        = "anonymousPhone"
                        value       = {this.state.form.anonymousPhone}
                        />
                </div>
                <div className = "form-group">
                    <label style={{paddingRight: 24, paddingLeft: 24}} hidden={(!this.props.display && this.state.currentPage!==4) || this.state.userId}>Correo de contacto</label>
                    <TextField
                        hidden      = {(!this.props.display && this.state.currentPage!==4) || this.state.userId}
                        style       = {{paddingBottom:24, paddingRight: 24, paddingLeft: 24}}
                        id          = "anonymousEmail"
                        placeholder = "Introduzca un correo electrónico para contactarlo"
                        margin      = "normal"
                        onChange    = {this.handleChange}
                        className   = "form-control"
                        type        = "text"
                        name        = "anonymousEmail"
                        value       = {this.state.form.anonymousEmail}
                        />
                </div>
                <p className="init-item" hidden={!this.props.display && this.state.currentPage!==4}> Al hacer utilizar el sistema usted acepta las condiciones de uso del mismo. <br/> Su información será utilizada de forma estrictamente confidencial.</p>
                <div align="center" hidden={!this.props.display && this.state.currentPage!==3}>
                    {!this.state.noMedia && <Button style={{padding: 12}} type="button" onClick={this.deleteAll} size="small" color="secondary" target="_blank">
                        Eliminar todo
                    </Button>}
                </div>
                <div align="center" style={{paddingLeft: 24, paddingRigth: 24}} hidden={!this.props.display && this.state.currentPage!==4}>
                    {this.state.missingFields && <div className="alert alert-warning"> Título y descripción son campos obligatorios </div>}
                </div>
                <div align="center" style={{paddingLeft: 24, paddingRigth: 24}} hidden={!this.props.display && this.state.currentPage!==4}>
                    {this.state.error && <div className="alert alert-danger"> Ocurrio un error, por favor inténtelo más tarde </div>}
                </div>
                <div align="center" hidden={!this.props.display && this.state.currentPage!==4}>
                    <Button style={{padding: 48}} type="button" onClick={this.handleClick} size="medium" color="primary" target="_blank">
                        Enviar Denuncia
                    </Button>
                </div>
                <div className="centered-component">
                    <Typography className="centered-component">{getStepContent(this.state.currentPage)}</Typography>
                    <div className="centered-component">
                    <Button
                        disabled  = {this.state.currentPage === 0}
                        onClick   = {this.handleBack}
                        // className = {this.classes.backButton}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant   = "contained"
                        color     = "primary"
                        disabled  = {this.state.currentPage === this.steps.length-1}
                        onClick   = {this.handleNext}>
                        Siguiente
                    </Button>
                    </div>
                </div>
                
                {/* type="button" */}
                {/* <button  className="btn btn-primary" style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer'}}></button> */}
            </form>
        </React.Fragment>);
    }
}

export default CreateForm;