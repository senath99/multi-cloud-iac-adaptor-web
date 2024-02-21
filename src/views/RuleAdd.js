import React from 'react';
import { useTheme, Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Box, Card } from '@material-ui/core';

import RuleAddEditForms from 'src/components/utils/RuleAddEditForms';

export default function RuleAdd() {
  return (
    <Box sx={{ mt: 15, px: 30 }}>
      <Card sx={{ display: 'flex', justifyContent: 'center' }}>
        <RuleAddEditForms />
      </Card>
    </Box>
  );
}
