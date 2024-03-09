import React from 'react';
import { Box, Card, CardContent } from '@material-ui/core';

import RuleAddEditForms from 'src/components/utils/RuleAddEditForms';
import Page from '../components/Page';

export default function RuleAdd() {
  return (
    <Page title="Resource Add">
      <Box sx={{ px: '15%', mt: '110px', mb: '20px' }}>
        <Card>
          <CardContent>
            <RuleAddEditForms />
          </CardContent>
        </Card>
      </Box>
    </Page>
  );
}
