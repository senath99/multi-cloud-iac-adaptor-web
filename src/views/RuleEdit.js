import React from 'react';
import { Container } from '@material-ui/core';
import { useParams } from 'react-router-dom';

import RuleEditor from 'src/components/utils/RuleEditor';

export default function RuleEdit() {
  const { stack } = useParams();
  return (
    <Container sx={{ mt: 15 }}>
      <RuleEditor stackName={stack} />
    </Container>
  );
}
