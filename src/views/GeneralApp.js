import React from 'react';
import { Container } from '@material-ui/core';

import InstanceList from 'src/components/dashboard/InstanceList';

export default function GeneralApp() {
  return (
    <Container sx={{ mt: 15 }}>
      <InstanceList />
    </Container>
  );
}
