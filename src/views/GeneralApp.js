import React from 'react';
import {
  Box,
  Grid,
  Card,
  Typography,
  useMediaQuery,
  useTheme,
  Container
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import InstanceList from 'src/components/dashboard/InstanceList';

export default function GeneralApp() {
  const dispatch = useDispatch();

  const theme = useTheme();

  return (
    <Container sx={{ mt: 15 }}>
      <InstanceList />
    </Container>
  );
}
