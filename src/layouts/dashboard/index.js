/*
 * Project: Dynamedics Supplier Portal Web
 * Created Date: Thursday April 13th 2023
 * Author: Senath Sadeesha
 * -----
 * Last Modified: Thursday April 13th 2023 12:04:27 am
 * Modified By: Senath Sadeesha at <sweerasinghe@mitrai.com>
 * -----
 * Copyright (c) 2023 Mitra Sparks
 * -----
 * HISTORY:
 */

import PropTypes from 'prop-types';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
//
import DashboardNavbar from './DashboardNavbar';

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%'
}));

// ----------------------------------------------------------------------

DashboardLayout.propTypes = {
  children: PropTypes.node
};

export default function DashboardLayout({ children }) {
  return (
    <RootStyle>
      <DashboardNavbar />
      <MainStyle>{children}</MainStyle>
    </RootStyle>
  );
}
