/*
 * Project: Dynamedics Portal Web
 * Created Date: Sunday May 16th 2021
 * Author: Nalinda Wijayagunawardhane
 * -----
 * Last Modified: Sunday May 16th 2021 1:16:59 pm
 * Modified By: Nalinda Wijayagunawardhane at <nwijayagunawardhane@mitrai.com>
 * -----
 * Copyright (c) 2021 Mitra Sparks
 * -----
 * HISTORY:
 */

import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
// guards
import AuthGuard from '../guards/AuthGuard';
// layouts
import DashboardLayout from '../layouts/dashboard';
//
import { PATH_DASHBOARD, PATH_PAGE } from './paths';

// ----------------------------------------------------------------------

const DashboardRoutes = {
  path: '*',
  layout: DashboardLayout,
  routes: [
    {
      exact: true,
      path: PATH_DASHBOARD.general.dashboard,
      component: lazy(() => import('../views/GeneralApp'))
    },

    // ----------------------------------------------------------------------
    {
      component: () => <Redirect to="/dashboard" />
    }
  ]
};

export default DashboardRoutes;
