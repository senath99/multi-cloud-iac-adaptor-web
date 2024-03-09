import React, { useState } from 'react';

import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Alert, Container, Typography } from '@material-ui/core';

// components

import Page from '../../Page';

//icons
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { getErrorAlert } from 'src/utils/functions';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0)
  }
}));

// ----------------------------------------------------------------------

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&::before': {
    display: 'none'
  }
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1)
  }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)'
}));

export default function WarningSuccess({
  resourceWarnings = [],
  violationLength,
  warningLength
}) {
  const [expanded, setExpanded] = useState(true);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <Container>
      <Alert variant="filled" severity="warning" sx={{ mb: 3 }}>
        {getErrorAlert(violationLength, warningLength)}
      </Alert>
      <Accordion expanded={expanded} onChange={handleExpansion}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Warnings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {resourceWarnings.map((warning) => {
            return (
              <Alert severity="warning" sx={{ mb: 1 }}>
                {warning}
              </Alert>
            );
          })}
        </AccordionDetails>
      </Accordion>
      <Typography
        variant="caption"
        textAlign={'center'}
        sx={{ color: 'text.secondary', display: 'block', marginTop: 5 }}
      >
        You still could click apply , and start to provision the resource.
      </Typography>
    </Container>
  );
}
