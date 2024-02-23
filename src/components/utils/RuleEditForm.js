import * as React from 'react';
import { useHistory } from 'react-router';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RuleAddEditForms from './RuleAddEditForms';
import { useDispatch, useSelector } from 'react-redux';
import { getInstancesByStackName } from 'src/redux/slices/data-sets';
import { useEffect } from 'react';
import { Card, Chip, Container, Grid } from '@material-ui/core';
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
                      <Grid item xs={9}>
                        <Typography variant="subtitle2">
                          version :
                          <Chip
                            label={stackItem.version}
                            variant="outlined"
                            color="success"
                          />
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="subtitle2">
                          <Chip
                            label={stackItem.status}
                            variant="outlined"
                            color={
                              stackItem.status == 'destroyed'
                                ? 'error'
                                : 'success'
                            }
                          />
                        </Typography>
                      </Grid>
                    </Grid>
                  </Container>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}
