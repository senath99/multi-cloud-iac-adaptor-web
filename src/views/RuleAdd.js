import React from 'react';
import { useTheme, Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Card } from '@material-ui/core';

import RuleAddEditForms from 'src/components/utils/RuleAddEditForms';

export default function RuleAdd() {
  return (
    <Container sx={{ mt: 15 }}>
      <Card sx={{ display: 'flex', justifyContent: 'center' }}>
        <RuleAddEditForms />
      </Card>
    </Container>
  );
}
