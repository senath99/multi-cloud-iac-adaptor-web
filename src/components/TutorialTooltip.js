/*
 * Project: Dynamedics Portal Web
 * Created Date: Monday May 16th 2022
 * Author: Nalinda Wijayagunawardhane
 * -----
 * Last Modified: Monday May 16th 2022 9:02:02 pm
 * Modified By: Nalinda Wijayagunawardhane at <nwijayagunawardhane@mitrai.com>
 * -----
 * Copyright (c) 2022 Mitra Sparks
 * -----
 * HISTORY:
 * 2022-07-19	NRB	Added styling changes and new illustration.
 */

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
  return (
    <Card
      {...tooltipProps}
      sx={{
        backgroundColor: '#2e348b',
        borderRadius: '0 !important',
        color: theme.palette.common.white
      }}
    >
      {index === 0 ? (
        <CardMedia
          image={`/static/illustrations/esg/${id()}.svg`}
          title="experienz"
          sx={{ margin: '0 auto', width: 400, height: 400 }}
        />
      ) : (
        <>
          <CardHeader
            titleTypographyProps={{
              fontWeight: 600,
              fontSize: '14px !important'
            }}
            title={step.title}
          ></CardHeader>
        </>
      )}
      <CardContent sx={{ py: 1 }}>
        {step.content}
        {index > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography
              component="p"
              variant="caption"
              textAlign="right"
            >{`${index} of ${size - 1}`}</Typography>
            <MLinearProgress
              variant="determinate"
              color="secondary"
              value={Math.floor((index / (size - 1)) * 100)}
              sx={{ height: 3, mt: 0, mb: 0 }}
            />
          </Box>
        )}
      </CardContent>
      <CardActions sx={{ overflow: 'visible' }}>
        {!isLastStep && (
          <Button {...skipProps} sx={{ fontWeight: 400 }}>
            Skip
          </Button>
        )}
        {index > 0 && (
          <Button {...backProps} sx={{ fontWeight: 400 }}>
            Back
          </Button>
        )}
        <Button
          {...primaryProps}
          sx={{ overflow: 'visible', fontWeight: 700, color: '#fdc300' }}
        >
          {isLastStep ? 'Finish' : index === 0 ? 'Start' : 'Next'}
        </Button>
      </CardActions>
    </Card>
  );
}
