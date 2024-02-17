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
import { Redirect } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_AUTH, PATH_PAGE } from '../routes/paths';
// components
import LoadingScreen from '../components/LoadingScreen';
//constants
import { ROLE_SUPPLIER_PORTAL_ACCESS } from '../utils/constants';
// ----------------------------------------------------------------------

AuthProtect.propTypes = {
  children: PropTypes.node
};

export default function AuthProtect({ children }) {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return <Redirect to={PATH_PAGE.page401} />;
  }

  return <>{children}</>;
}
