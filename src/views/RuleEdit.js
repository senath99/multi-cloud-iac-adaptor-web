import React from 'react';
import { Container } from '@material-ui/core';
import { useParams } from 'react-router-dom';

import RuleEditForm from 'src/components/utils/RuleEditForm';
import Page from '../components/Page';

export default function RuleEdit() {
  const { stack } = useParams();
  return (
    <Container sx={{ mt: 15 }}>
      <RuleEditForm stackName={stack} />
    </Container>
  );
}
