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
import { Stack } from '@material-ui/core';
import parse from 'html-react-parser';

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
  const [resourceLogs, setresourceLogs] = useState([]);
  const [isAllow, setAllow] = useState(false);
  const [isLoading, setLoading] = useState(0);

  useEffect(async () => {
    setLoading(true);
    const response = await validateResource();
    if (response.status == 200) {
      const data = response.data;
      setresourceViolations(data.violations);
      setresourceWarnings(data.warnings);

      setresourceLogs(data.log);
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

  const LOG_LENGTH = resourceLogs.length;

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
                <Stack sx={{ maxHeight: '200px', overflowY: 'scroll' }}>
                  {VIOLATION_LENGTH > 0 &&
                    resourceViolations.map((violation) => {
                      return (
                        <Alert severity="error" sx={{ mb: 1, p: 0.3 }}>
                          {violation}
                        </Alert>
                      );
                    })}
                </Stack>
              </AccordionDetails>
            </Accordion>
          )}
          {WARNING_LENGTH > 0 && (
            <Accordion sx={{ mb: 2 }}>
              <AccordionSummary
                aria-controls="panel2d-content"
                id="panel2d-header"
              >
                <Typography>Warnings</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack sx={{ maxHeight: '200px', overflowY: 'scroll' }}>
                  {WARNING_LENGTH > 0 &&
                    resourceWarnings.map((warning) => {
                      return (
                        <Alert severity="warning" sx={{ mb: 1, p: 0.3 }}>
                          {warning}
                        </Alert>
                      );
                    })}
                </Stack>
              </AccordionDetails>
            </Accordion>
          )}

          {LOG_LENGTH > 0 && (
            <Accordion>
              <AccordionSummary
                aria-controls="panel2d-content"
                id="panel2d-header"
              >
                <Typography>Logs</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack sx={{ maxHeight: '200px', overflowY: 'scroll' }}>
                  <Typography variant="caption" sx={{ whiteSpace: 'pre-wrap' }}>
                    {resourceLogs}
                  </Typography>
                </Stack>
              </AccordionDetails>
            </Accordion>
          )}
        </Box>
      ) : WARNING_LENGTH > 0 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <WarningSuccess
            resourceWarnings={resourceWarnings}
            violationLength={VIOLATION_LENGTH}
            warningLength={WARNING_LENGTH}
            resourceLogs={resourceLogs}
            logLength={LOG_LENGTH}
          />
        </Box>
      ) : (
        <Box>
          <Box sx={{ mb: 2, px: 20 }}>
            <Success />
          </Box>
          <Accordion expanded={expanded} onChange={handleExpansion}>
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <Typography>Logs</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack sx={{ maxHeight: '200px', overflowY: 'scroll' }}>
                <Typography variant="caption" sx={{ whiteSpace: 'pre-wrap' }}>
                  {resourceLogs}
                </Typography>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 2,
          padding: 2
        }}
      >
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
