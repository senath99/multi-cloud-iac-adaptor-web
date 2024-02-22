import * as React from 'react';
import { useHistory } from 'react-router';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RuleAddEditForms from './RuleAddEditForms';
import { useDispatch, useSelector } from 'react-redux';
import { getInstancesByStackName } from 'src/redux/slices/data-sets';
import { useEffect } from 'react';
import { Card, Container, Grid } from '@material-ui/core';
import { PATH_DASHBOARD } from 'src/routes/paths';

export default function RuleEditForm({ stackName }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { stack } = useSelector((state) => state.datasets);

  useEffect(() => {
    dispatch(getInstancesByStackName(stackName));
  }, []);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleEditNewOpen = () => {
    history.push(`${PATH_DASHBOARD.general.ruleAdd}`);
  };

  return (
    <div>
      <Typography variant="title">{stack[0]?.stack_name}</Typography>
      <Grid container spacing={1}>
        {stack.length > 0 &&
          stack.map((stackItem) => {
            return (
              <Grid item xs={6}>
                <Card
                  onClick={handleEditNewOpen}
                  sx={{
                    mb: 2,
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Container>
                    <Grid container>
                      <Grid item xs={5}>
                        <Typography variant="subtitle2">
                          version :{stackItem.version}
                        </Typography>
                      </Grid>
                      <Grid item xs={5}>
                        <Typography variant="subtitle2">
                          status :{stackItem.status}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Container>
                </Card>
              </Grid>
            );
          })}
      </Grid>
      {/* <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            General settings
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            I am an accordion
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RuleAddEditForms />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Users</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            You are currently not an owner
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat
            lectus, varius pulvinar diam eros in elit. Pellentesque convallis
            laoreet laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Advanced settings
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Filtering has been entirely disabled for whole web server
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel4'}
        onChange={handleChange('panel4')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Personal data
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
}
