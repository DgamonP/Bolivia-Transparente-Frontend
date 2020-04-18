import React from 'react';
import './styles/stepper.css'
import Step from '@material-ui/core/Step';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

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

export default function HorizontalLabelPositionBelowStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    props.udpatePage(activeStep+1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    props.udpatePage(activeStep-1);
  };

  const handleReset = () => {
    setActiveStep(0);
    props.udpatePage(0);
  };
  // console.log("Current active step",activeStep);

  return (
    <div hidden={props.hidden} className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel style={{backgroundColor:"transparent"}}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div className="centered-component">
            <Typography className={classes.instructions}>Todos los pasos fueron completados</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div className="centered-component">
            <Typography className="centered-component">{getStepContent(activeStep)}</Typography>
            <div className="centered-component">
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Anterior
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Terminar' : 'Siguiente'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
