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

// layouts
import DashboardLayout from '../layouts/dashboard';

// ----------------------------------------------------------------------

const DashboardRoutes = {
  path: '*',
  layout: DashboardLayout,
  routes: [
    {
      exact: true,
      path: '/',
      component: lazy(() => import('../views/PreRegistration'))
    },
    {
      exact: true,
      path: '/success-page',
      component: lazy(() => import('../views/SuccessPage'))
    }
  ]
};

export default DashboardRoutes;
