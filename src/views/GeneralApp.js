import React from 'react';
import { useTheme, Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';

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
