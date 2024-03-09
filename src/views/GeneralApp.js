import React from 'react';
import { Container } from '@material-ui/core';

import InstanceList from 'src/components/dashboard/InstanceList';
import Page from 'src/components/Page';

export default function GeneralApp() {
  return (
    <Page title="Multi Cloud Firewall Framework">
      <Container sx={{ mt: 15 }}>
        <InstanceList />
      </Container>
    </Page>
  );
}
