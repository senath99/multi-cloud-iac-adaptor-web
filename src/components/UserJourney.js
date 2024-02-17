import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import LinearProgress from '@material-ui/core/LinearProgress';
import withStyles from '@material-ui/core/styles/withStyles';

const customStepperStyle = {
  stepper: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-around',
    padding: 0,
    width: '100%'
  },

  stepper__step: {
    position: 'relative',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%'
  },

  stepper__step__index: {
    width: '30px',
    height: '30px',
    lineHeight: '30px',
    borderRadius: '50%',
    background: '#dedede',
    color: '#999',
    textAlign: 'center',
    marginBottom: '5px'
  },

  stepper__step__label: {
    color: '#999',
    margin: 0
  },

  labelContainer: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center'
  },

  linearProgress: {
    flex: '1 1 auto',
    position: 'absolute',
    top: 12,
    left: 'calc(-50% + 20px)',
    right: 'calc(50% + 20px)',
    backgroundColor: '#ffd8ba61'
  },

  bar: {
    backgroundColor: 'orange'
  },

  currentStep: {
    backgroundColor: 'orange !important',
    color: '#fff',
    fontWeight: '500'
  },

  done: {
    backgroundColor: 'orange !important',
    color: '#fff',
    fontWeight: '500'
  }
};

function CustomStepper(props) {
  const { steps, current, progress, classes } = props;

  function StepContent({ done, index }) {
    return done ? '✓' : index + 1;
  }

  const ProgressBar = ({ current, step, progress }) => {
    let value = 0;
    if (current + 1 === step) {
      value = progress;
    } else if (current >= step) {
      value = 100;
    }

    return (
      <LinearProgress
        variant="determinate"
        value={value}
        classes={{ root: classes.linearProgress, bar: classes.bar }}
      />
    );
  };

  function renderStep(label, key) {
    const { current, progress } = this;
    const done = key < current;
    const currentStep = key === current;
    const stepClasses = classNames({
      [classes.stepper__step__index]: true,
      [classes.currentStep]: currentStep,
      [classes.done]: done
    });

    return (
      <li className={classes.stepper__step} key={key}>
        <div className={classes.labelContainer}>
          <span className={stepClasses}>
            <StepContent done={done} index={key} />
          </span>
          <p className={classes.stepper__step__label}>{label}</p>
        </div>
        {!!key && (
          <ProgressBar current={current} step={key} progress={progress} />
        )}
      </li>
    );
  }

  return (
    <ul className={classes.stepper}>
      {['Label 1', 'Label 2', 'Label 3'].map(renderStep, { current, progress })}
    </ul>
  );
}

CustomStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  steps: PropTypes.array.isRequired,
  current: PropTypes.number.isRequired,
  progress: PropTypes.number
};

export default withStyles(customStepperStyle)(CustomStepper);

// import * as React from 'react';
// import PropTypes from 'prop-types';
// import { styled } from '@mui/material/styles';
// import Stack from '@mui/material/Stack';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import Check from '@mui/icons-material/Check';
// import SettingsIcon from '@mui/icons-material/EnergySavingsLeafTwoTone';
// import GroupAddIcon from '@mui/icons-material/People';
// import VideoLabelIcon from '@mui/icons-material/Policy';
// import StepConnector, {
//   stepConnectorClasses
// } from '@mui/material/StepConnector';
// import { Box, Typography } from '@material-ui/core';
// import LinearProgress, {
//   linearProgressClasses
// } from '@mui/material/LinearProgress';

// const QontoConnector = styled(StepConnector)(({ theme }) => ({
//   [`&.${stepConnectorClasses.alternativeLabel}`]: {
//     top: 10,
//     left: 'calc(-50% + 16px)',
//     right: 'calc(50% + 16px)'
//   },
//   [`&.${stepConnectorClasses.active}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       borderColor: '#784af4'
//     }
//   },
//   [`&.${stepConnectorClasses.completed}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       borderColor: '#784af4'
//     }
//   },
//   [`& .${stepConnectorClasses.line}`]: {
//     borderColor:
//       theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
//     borderTopWidth: 3,
//     borderRadius: 1
//   }
// }));

// const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
//   color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
//   display: 'flex',
//   height: 22,
//   alignItems: 'center',
//   ...(ownerState.active && {
//     color: '#784af4'
//   }),
//   '& .QontoStepIcon-completedIcon': {
//     color: '#784af4',
//     zIndex: 1,
//     fontSize: 18
//   },
//   '& .QontoStepIcon-circle': {
//     width: 8,
//     height: 8,
//     borderRadius: '50%',
//     backgroundColor: 'currentColor'
//   }
// }));

// function QontoStepIcon(props) {
//   const { active, completed, className } = props;

//   return (
//     <QontoStepIconRoot ownerState={{ active }} className={className}>
//       {completed ? (
//         <Check className="QontoStepIcon-completedIcon" />
//       ) : (
//         <div className="QontoStepIcon-circle" />
//       )}
//     </QontoStepIconRoot>
//   );
// }

// QontoStepIcon.propTypes = {
//   /**
//    * Whether this step is active.
//    * @default false
//    */
//   active: PropTypes.bool,
//   className: PropTypes.string,
//   /**
//    * Mark the step as completed. Is passed to child components.
//    * @default false
//    */
//   completed: PropTypes.bool
// };

// const ColorlibConnector = styled(LinearProgress)(({ theme }) => ({
//   [`&.${stepConnectorClasses.alternativeLabel}`]: {
//     top: 22
//   },
//   [`&.${stepConnectorClasses.active}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       backgroundImage:
//         'linear-gradient( 136deg,rgb(0,172,165) 0%, rgb(0,197,189) 50%, rgb(0,223,213) 100%)'
//     }
//   },
//   [`&.${stepConnectorClasses.completed}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       backgroundImage:
//         'linear-gradient( 136deg,rgb(0,121,116) 0%, rgb(0,146,140) 50%, rgb(0,172,165) 100%)'
//     }
//   },
//   [`& .${stepConnectorClasses.line}`]: {
//     height: 3,
//     border: 0,
//     backgroundColor:
//       theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
//     borderRadius: 1
//   }
// }));

// function LinearProgressWithLabel() {
//   return (
//     <Box>
//       <Box sx={{ width: '100%' }}>
//         <LinearProgress variant="determinate" />
//       </Box>
//       <Box sx={{ minWidth: 35 }}>
//         <Typography variant="body2" color="text.secondary">
//           10%
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
//   [`&.${stepConnectorClasses.alternativeLabel}`]: {
//     top: 22
//   },
//   [`&.${stepConnectorClasses.active}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       backgroundImage:
//         'linear-gradient( 136deg,rgb(0,172,165) 0%, rgb(0,197,189) 50%, rgb(0,223,213) 100%)'
//     }
//   },
//   [`&.${stepConnectorClasses.completed}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       backgroundImage:
//         'linear-gradient( 136deg,rgb(0,121,116) 0%, rgb(0,146,140) 50%, rgb(0,172,165) 100%)'
//     }
//   },
//   [`& .${stepConnectorClasses.line}`]: {
//     height: 3,
//     border: 0,
//     backgroundColor:
//       theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
//     borderRadius: 1
//   }
// }));

// const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
//   backgroundColor:
//     theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
//   zIndex: 1,
//   color: '#fff',
//   width: 40,
//   height: 40,
//   display: 'flex',
//   borderRadius: '50%',
//   justifyContent: 'center',
//   alignItems: 'center',
//   ...(ownerState.active && {
//     backgroundImage:
//       'linear-gradient( 136deg,rgb(0,172,165) 0%, rgb(0,197,189) 50%, rgb(0,223,213) 100%)',
//     boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
//   }),
//   ...(ownerState.completed && {
//     backgroundImage:
//       'linear-gradient( 136deg,rgb(0,121,116) 0%, rgb(0,146,140) 50%, rgb(0,172,165) 100%)'
//   })
// }));

// function ColorlibStepIcon(props) {
//   const { active, completed, className } = props;

//   const icons = {
//     1: <SettingsIcon />,
//     2: <GroupAddIcon />,
//     3: <VideoLabelIcon />
//   };

//   return (
//     <ColorlibStepIconRoot
//       ownerState={{ completed, active }}
//       className={className}
//     >
//       {icons[String(props.icon)]}
//     </ColorlibStepIconRoot>
//   );
// }

// ColorlibStepIcon.propTypes = {
//   /**
//    * Whether this step is active.
//    * @default false
//    */
//   active: PropTypes.bool,
//   className: PropTypes.string,
//   /**
//    * Mark the step as completed. Is passed to child components.
//    * @default false
//    */
//   completed: PropTypes.bool,
//   /**
//    * The label displayed in the step icon.
//    */
//   icon: PropTypes.node
// };

// const steps = ['Environment', 'Social', 'Governance'];

// export default function CustomizedSteppers() {
//   return (
//     <Stack sx={{ width: '100%' }} spacing={4}>
//       <Stepper
//         alternativeLabel
//         activeStep={3}
//         connector={<ColorlibConnector />}
//       >
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//     </Stack>
//   );
// }
