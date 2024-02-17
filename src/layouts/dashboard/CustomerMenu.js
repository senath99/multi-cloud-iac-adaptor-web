/*
 * Project: Dynamedics Supplier Portal Web
 * Created Date: Wednesday April 19th 2023
 * Author: senath999
 * -----
 * Last Modified: Sunday April 23rd 2023 7:38:44 pm
 * Modified By: Vithushan Sylvester at <vsylvester@mitrai.com>
 * -----
 * Copyright (c) 2023 Mitra Sparks
 * -----
 * HISTORY:
 * 2023-04-23 index outbound exception handling added
 */

import { useState } from 'react';
import { useSelector } from 'react-redux';
// material
import { Typography, useMediaQuery, useTheme } from '@material-ui/core';

// hooks

// ----------------------------------------------------------------------

export default function CustomerMenu() {
  const { customers, currentCustomer } = useSelector((state) => state.customer);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Typography color="white" variant={isMobile && 'body2'}>
        {currentCustomer ? currentCustomer?.name : customers[0]?.name}
      </Typography>

      {/* <MenuPopover
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={anchorRef.current}
      >
        <Box>
          {customers.map((option, index) => (
            <Box key={index}>
              <MenuItem
                key={option.name}
                selected={option.name === selectedCustomer.name}
                onClick={() => {
                  onCustomerChange(option);
                  setOpen(false);
                }}
                sx={{ py: 1 }}
              >
                <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                  <Typography noWrap variant={'body2'}>
                    {option.name}
                  </Typography>
                </ListItemText>
              </MenuItem>
              <Divider />
            </Box>
          ))}
        </Box>
      </MenuPopover> */}
    </>
  );
}
