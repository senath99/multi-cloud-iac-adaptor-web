import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

// layouts
import DashboardLayout from '../layouts/dashboard';
//
import { PATH_DASHBOARD } from './paths';

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
    {
      exact: true,
      path: PATH_DASHBOARD.general.ruleAdd,
      component: lazy(() => import('../views/RuleAdd'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.general.ruleEditPage,
      component: lazy(() => import('../views/RuleEditForm'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.general.ruleEdit,
      component: lazy(() => import('../views/RuleEdit'))
    },

    // ----------------------------------------------------------------------
    {
      component: () => <Redirect to="/dashboard" />
    }
  ]
};

export default DashboardRoutes;
