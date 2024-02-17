/*
 * Project: Dynamedics Supplier Portal Web
 * Created Date: Monday March 13th 2023
 * Author: Senath Weerasinghe
 * -----
 * Last Modified: Monday March 13th 2023 4:02:31 pm
 * Modified By: Senath Weerasinghe at sweerasinghe@mitrai.com
 * -----
 * Copyright (c) 2023 Mitra Sparks
 * -----
 * HISTORY:
 */

import PropTypes from 'prop-types';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, AppBar, Toolbar } from '@material-ui/core';

// material
import { Link as RouterLink } from 'react-router-dom';
import Logo from 'src/components/Logo';
import { useSelector } from 'react-redux';

import CustomerMenu from './CustomerMenu';

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar)(({ theme }) => ({
  // position: 'static',
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72)
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  padding: 2,
  minHeight: '60px',
  background: theme.palette.gradients.toolbar
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',

  padding: theme.spacing(0, 2, 2, 2)
}));
// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func
};

export default function DashboardNavbar() {
  return (
    <RootStyle>
      <ToolbarStyle variant="dense">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& > *:not(:first-of-type)': {
              ml: { xs: 1.5, sm: 2, lg: 3 }
            }
          }}
        >
          <HeaderStyle sx={{ mt: 2 }}>Multi Cloud IAC Adapter</HeaderStyle>
        </Box>

        {/* <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            ml: 3,
            '& > *:not(:first-of-type)': {
              ml: { xs: 1.5, sm: 5, lg: 6 }
            }
          }}
        >
          <AccountPopover />
        </Box> */}
      </ToolbarStyle>
    </RootStyle>
  );
}
