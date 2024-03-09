import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Alert, Box } from '@mui/material';
import { LoadingButton } from '@material-ui/lab';
//icons
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

import ComingSoon from './ComingSoon';
import Success from './Success';
import { getErrorAlert } from 'src/utils/functions';
import WarningSuccess from './WarningSuccess';

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

export default function ViolationAccordian({
  handleCancel,
  validateResource,
  handleSubmit,
  isResourceLoading
}) {
  const [resourceViolations, setresourceViolations] = useState([]);
  const [resourceWarnings, setresourceWarnings] = useState([]);
  const [isAllow, setAllow] = useState(false);
  const [isLoading, setLoading] = useState(0);

  useEffect(async () => {
    setLoading(true);
    const response = await validateResource();
    if (response.status == 200) {
      const data = response.data;
      setresourceViolations(data.violations);
      setresourceWarnings(data.warnings);
      setAllow(data.allow);
    }
    setLoading(false);
  }, []);

  const [expanded, setExpanded] = useState(true);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 30,
          py: '20%'
        }}
      >
        <ComingSoon />
      </Box>
    );
  }

  const VIOLATION_LENGTH = resourceViolations.length;

  const WARNING_LENGTH = resourceWarnings.length;

  const onDelete = () => {
    handleCancel();
  };
  return (
    <div>
      {isAllow == 0 ? (
        <Box>
          <Alert variant="filled" severity="error" sx={{ mb: 3 }}>
            {getErrorAlert(VIOLATION_LENGTH, WARNING_LENGTH)}
          </Alert>
          {VIOLATION_LENGTH > 0 && (
            <Accordion
              sx={{ mb: 2 }}
              expanded={expanded}
              onChange={handleExpansion}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>Violations</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {VIOLATION_LENGTH > 0 &&
                  resourceViolations.map((violation) => {
                    return (
                      <Alert severity="error" sx={{ mb: 1 }}>
                        {violation}
                      </Alert>
                    );
                  })}
              </AccordionDetails>
            </Accordion>
          )}
          {WARNING_LENGTH > 0 && (
            <Accordion>
              <AccordionSummary
                aria-controls="panel2d-content"
                id="panel2d-header"
              >
                <Typography>Warnings</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {WARNING_LENGTH > 0 &&
                  resourceWarnings.map((warning) => {
                    return (
                      <Alert severity="warning" sx={{ mb: 1 }}>
                        {warning}
                      </Alert>
                    );
                  })}
              </AccordionDetails>
            </Accordion>
          )}
        </Box>
      ) : WARNING_LENGTH > 0 ? (
        <Box>
          <WarningSuccess
            resourceWarnings={resourceWarnings}
            violationLength={VIOLATION_LENGTH}
            warningLength={WARNING_LENGTH}
          />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            px: 30,
            py: '10%'
          }}
        >
          <Success />
        </Box>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 10 }}>
        <LoadingButton
          type="button"
          variant="contained"
          disabled={isAllow == 0}
          onClick={handleSubmit}
          pending={isResourceLoading}
        >
          Apply
        </LoadingButton>
        <LoadingButton
          id="cancel"
          type="button"
          onClick={() => onDelete()}
          //   sx={{ ml: 2 }}
          //   pending={iscancelLoading}
        >
          Cancel
        </LoadingButton>
      </Box>
    </div>
  );
}
