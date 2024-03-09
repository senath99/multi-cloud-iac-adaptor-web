import PropTypes from 'prop-types';
// material
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  CardActions,
  Typography,
  CardMedia,
  Box
} from '@material-ui/core';
import { MLinearProgress } from './@material-extend';
import { useTheme } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

TutorialTooltip.propTypes = {
  index: PropTypes.number,
  size: PropTypes.number,
  continuous: PropTypes.bool,
  isLastStep: PropTypes.bool,
  step: PropTypes.object,
  backProps: PropTypes.object,
  primaryProps: PropTypes.object,
  skipProps: PropTypes.object,
  setTooltipRef: PropTypes.object,
  tooltipProps: PropTypes.object
};

export function TutorialTooltip({
  index,
  isLastStep,
  step,
  size,
  backProps,
  primaryProps,
  skipProps,
  tooltipProps
}) {
  const theme = useTheme();
  const id = () => parseInt(new Date().getTime() / (1000 * 60)) % 10;
  return <Box></Box>;
}
