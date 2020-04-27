import React from 'react';
import '../../views/pages/styles/createForm.css';
import firebase from "firebase";
import 'react-dates/initialize';
import {createReport} from '../../api/graphql';
import 'react-dates/lib/css/_datepicker.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FileUploader from "react-firebase-file-uploader";
import videoPlaceholder from '../../images/videoPlaceholder.jpeg'
import CircularProgress from '@material-ui/core/CircularProgress';

// import {SingleDatePicker} from 'react-dates';

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
            title: "",
            description: "",
            literalLocation: "",
            date: "2020-04-02",
            time: "12:00",
            file: "",
            imagesURL: [],
            videosURL: [],
        },
        isUploading     : false,
        progress        : 0,
        notSupported    : false,
        networkError    : false,
        noMedia         : true,
        missingFields   : false,
        error           : null,
    };
    constructor(props){
        super(props);
        console.log("Constructor has videos");
        console.log(this.state.form.videosURL);
    }

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
            imagesURL : [], videosURL : [],
            noMedia:true}})
    }

    handleClick = async e => {
        if(this.state.form.title === "" || this.state.form.description === ""){
            this.setState({missingFields:true}) 
        }
        else{
            console.log('Title');
            console.log(this.state.form.title);
            createReport(this.state.form.title,this.state.form.description,this.state.form.literalLocation,this.state.form.date,this.state.form.time,0.0,0.0,this.state.form.imagesURL,this.state.form.videosURL)
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
        // console.log(this.state.form.imagesURL);
        // let newList = this.state.form.imagesURL.splice(this.state.form.imagesURL.indexOf(urlToRemove),1);
        // this.setState({form:{...this.state.form,imagesURL:newList}});
        
        // console.log("After:");
        // console.log(this.state.form.imagesURL);
    }

    _removeVideo = (urlToRemove) =>{
        // let newList = this.state.form.videosURL.splice(this.state.form.videosURL.indexOf(urlToRemove),1);
        // this.setState({form:{...this.state.form,videosURL:newList}});
        // console.log(this.state.form.videosURL);
    }
    _isVideo = filename => {
        return filename.includes(".mp4") || filename.includes(".avi");
    };

    _isImage = filename => {
        return filename.includes(".jpeg") || filename.includes(".png") || filename.includes(".jpg");
    };

    _isSupported = filename => {
        return this._isVideo(filename) || this._isImage(filename);
    }

    handleUploadSuccess = filename => {
        console.log("Successfully added file");
        let hasNoMedia = !(this.state.form.imagesURL || this.state.form.videosURL);
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
                        var  myImageList = this.state.form.imagesURL;
                        myImageList.push(url);
                        this.setState({ form:{
                            ...this.state.form,
                            imagesURL: myImageList} });
                        console.log(this.state.form);
                        console.log("Finished uploading:");
                        console.log(url);
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
                                var  myVideoList = this.state.form.videosURL;
                                myVideoList.push(url);
                                this.setState({form:{
                                    ...this.state.form,
                                    videosURL: myVideoList }});
                                console.log(this.state.form);
                                console.log("Finished uploading video");
                                console.log(url);
                            });
                        }
                }
            }
            else{
                this.setState({notSupported:true})
            }
        }

    render(){
        return(
        <div>
            <br/><br/><br/>
            <h2 style={{padding:12}}> Nueva Denuncia</h2>
            <form onSubmit = {this.handleSubmit}>
                <div>
                    <div className="row">
                        <div className="col-6">
                            <div className = "form-group">
                                <label style={{paddingRight: 24, paddingLeft: 24}}>Fecha del incidente *</label>
                                <TextField
                                    style       = {{paddingBottom:24, paddingRight: 24, paddingLeft: 24}}
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
                        </div>
                        <div className="col-6">
                            <div className = "form-group">
                                <label style={{paddingRight: 24, paddingLeft: 24}}>Hora del incidente (opcional)</label>
                                <TextField
                                    style       = {{paddingBottom:24, paddingRight: 24, paddingLeft: 24}}
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
                </div>
                <div className = "form-group">
                    <label style={{paddingRight: 24, paddingLeft: 24}}>Título</label>
                    <TextField
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
                <div className = "Descripción">
                    <label style={{paddingRight: 24, paddingLeft: 24}}>Descripción</label>
                    <TextField
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
                <div className = "form-group">
                    <label style={{paddingRight: 24, paddingLeft: 24}}>Ubicación Literal</label>
                    <TextField
                        style       = {{paddingBottom:24, paddingRight: 24, paddingLeft: 24}}
                        id          = "location_id"
                        placeholder = "Dónde sucedió el acontecimiento, por favor sea lo más explícito posible"
                        margin      = "normal"
                        onChange    = {this.handleChange}
                        className   = "form-control"
                        type        = "text"
                        name        = "literalLocation"
                        value       = {this.state.form.literalLocation}
                        />
                </div>
                
                {/* <div align="center" style={{paddingLeft: 24, paddingRigth: 24}}>
                    {this.state.isUploading && <div className="alert alert-primary"> Progress: {this.state.progress} </div>}
                </div> */}
                <div align="center" style={{paddingLeft: 24, paddingRigth: 24}}>
                    {this.state.isUploading && <CircularProgress variant="determinate" value={this.state.progress} />}
                </div>
                <div className = "form-group" align="center">
                    <label style={{paddingRight: 24, paddingLeft: 24}}> Si desea adjuntar evidencia puede realizarlo a continuación:</label>
                    <br/>
                    <div style={{paddingTop: 24, paddingRight: 24, paddingLeft: 24}}>
                    <label style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer'}}>
                        Seleccione un archivo 
                        <FileUploader
                            hidden
                            accept="image/video"
                            storageRef={firebase.storage().ref('images')}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                            onProgress={this.handleProgress}
                        />
                    </label>
                    </div>
                </div>
                <div className="flexcontainer">
                    {this.state.form.imagesURL.map(currentUrl=>{
                        // Not working: onClick={() => {this._removeImage(currentUrl)}} 
                        return(<div onClick={() => {this._removeImage(currentUrl)}} className="flexitem" key={currentUrl}>
                            {currentUrl && <img src={currentUrl} style={{padding: 24}} width="320px"/>}
                            {false && currentUrl && <p className="legend">currentUrl</p>}
                            
                        </div>);
                    })}
                </div>
                <div className="flexcontainer">
                    {this.state.form.videosURL.map(currentUrl=>{
                        // Not working: onClick={() => {this._removeVideo(currentUrl)}} 
                        return(<div onClick={() => {this._removeVideo(currentUrl)}}  className="flexitem" key={currentUrl}>
                            {currentUrl && <img src={videoPlaceholder} style={{padding: 24}} width="320px"/>}
                            {false && currentUrl && <p className="legend">currentUrl</p>}
                        </div>);
                    })}
                </div>
                <div align="center">
                    
                    {!this.state.noMedia && <Button style={{padding: 12}} type="button" onClick={this.deleteAll} size="small" color="secondary" target="_blank">
                        Eliminar todo
                    </Button>}
                </div>
                <div align="center" style={{paddingLeft: 24, paddingRigth: 24}}>
                    {this.state.missingFields && <div className="alert alert-warning"> Título y descripción son campos obligatorios </div>}
                </div>
                <div align="center" style={{paddingLeft: 24, paddingRigth: 24}}>
                    {this.state.error && <div className="alert alert-danger"> Ocurrio un error, por favor inténtelo más tarde </div>}
                </div>
                <div align="center">
                    <Button style={{padding: 48}} type="button" onClick={this.handleClick} size="medium" color="primary" target="_blank">
                        Enviar Denuncia
                    </Button>
                </div>
                
                
                {/* type="button" */}
                {/* <button  className="btn btn-primary" style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer'}}></button> */}
            </form>
        </div>);
    }
}

export default CreateForm;