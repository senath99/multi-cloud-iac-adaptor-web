import React from 'react';
import { useTheme, Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Card } from '@material-ui/core';

import RuleAddEditForms from 'src/components/utils/RuleAddEditForms';
import RuleEditForm from 'src/components/utils/RuleEditForm';

export default function RuleEdit() {
  return (
    <Container sx={{ mt: 15 }}>
      <Card sx={{ display: 'flex', justifyContent: 'center' }}>
        <RuleEditForm />
      </Card>
    </Container>
  );
}
