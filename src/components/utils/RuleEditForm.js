import * as React from 'react';
import { useHistory } from 'react-router';
import Typography from '@mui/material/Typography';

import { useDispatch, useSelector } from 'react-redux';
import { getInstancesByStackName } from 'src/redux/slices/data-sets';
import { useEffect } from 'react';
import { Box, Card, Chip, Container, Grid } from '@material-ui/core';
import { PATH_DASHBOARD } from 'src/routes/paths';
import LoadingScreen from '../LoadingScreen';

export default function RuleEditForm({ stackName }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { stack, isLoading } = useSelector((state) => state.datasets);

  useEffect(() => {
    dispatch(getInstancesByStackName(stackName));
  }, []);

  const handleEditNewOpen = () => {
    history.push(`${PATH_DASHBOARD.general.ruleAdd}`);
  };

  return (
    <div>
      {isLoading ? (
        <Box sx={{ my: 40 }}>
          <LoadingScreen />
        </Box>
      ) : (
        <Box>
          <Box sx={{ mb: 5 }}>
            <Typography variant="title">{stack[0]?.stack_name}</Typography>
          </Box>
          <Grid container spacing={1}>
            {stack.length > 0 &&
              stack.map((stackItem) => {
                return (
                  <Grid item xs={12} md={6} lg={6}>
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
        </Box>
      )}
    </div>
  );
}
