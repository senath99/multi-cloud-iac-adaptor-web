import React from 'react';
import { Box, Card, Dialog, Typography } from '@material-ui/core';

import RuleAddEditForms from 'src/components/utils/RuleAddEditForms';

export default function RuleAdd() {
  const [anchorel, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorel);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box sx={{ mt: 15, mb: 10, px: 30 }}>
      <Card sx={{ display: 'flex', justifyContent: 'center' }}>
        <RuleAddEditForms />
      </Card>
    </Box>
  );
}
