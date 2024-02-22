import React from 'react';
import { useTheme, Container } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { Card } from '@material-ui/core';

import RuleAddEditForms from 'src/components/utils/RuleAddEditForms';
import RuleEditForm from 'src/components/utils/RuleEditForm';

export default function RuleEdit() {
  const { stack } = useParams();
  return (
    <Container sx={{ mt: 15 }}>
      <RuleEditForm stackName={stack} />
    </Container>
  );
}
