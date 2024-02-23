import React from 'react';
import { Box, Card } from '@material-ui/core';

import RuleAddEditForms from 'src/components/utils/RuleAddEditForms';

export default function RuleAdd() {
  return (
    <Box sx={{ mt: 15, mb: 10, px: 30 }}>
      <Card sx={{ display: 'flex', justifyContent: 'center' }}>
        <RuleAddEditForms />
      </Card>
    </Box>
  );
}
