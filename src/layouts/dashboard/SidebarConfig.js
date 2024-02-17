// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

import {
  ROLE_PULSE,
  ROLE_PRODUCTIVITY,
  ROLE_ORGANIZATIONAL_HEALTH,
  ROLE_FINANCIAL_OUTCOMES,
  ROLE_APPLICATION_USAGE,
  ROLE_INTEREST_GROUPS,
  ROLE_CONTENT,
  ROLE_COMMUNICATION,
  ROLE_SURVEYS,
  ROLE_SETTINGS,
  ROLE_USERS,
  ROLE_REPORT_READ,
  ROLE_INTEGRATED_REPORTS_READ
} from '../../utils/constants';
// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle
    src={`/static/icons/navbar/${name}.svg`}
    sx={{ width: 22, height: 22 }}
  />
);

const getBookmarkIcon = (name) => (
  <SvgIconStyle
    src={`/static/icons/navbar/${name}.svg`}
    sx={{ width: 22, height: 13 }}
  />
);

const ICONS = {
  map: getIcon('ic_map'),
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  page: getIcon('ic_page'),
  user: getIcon('ic_user'),
  copy: getIcon('ic_copy'),
  error: getIcon('ic_error'),
  charts: getIcon('ic_charts'),
  editor: getIcon('ic_editor'),
  upload: getIcon('ic_upload'),
  animate: getIcon('ic_animate'),
  calendar: getIcon('ic_calendar'),
  elements: getIcon('ic_elements'),
  carousel: getIcon('ic_carousel'),
  language: getIcon('ic_language'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  components: getIcon('ic_components'),
  authenticator: getIcon('ic_authenticator'),
  settings: getIcon('ic_settings'),
  dataSetManagement: getIcon('ic_copy'),
  intergratedReports: getIcon('ic_page'),
  bookmark: getBookmarkIcon('ic_bookmark')
};

const getBookmarkedItems = (bookmarks) => {
  return bookmarks.map((bookmark) => {
    return { ...bookmark };
  });
};

function sidebarconfig(bookmarks) {
  const MenuLinks = [
    // DASHBOARD
    // ----------------------------------------------------------------------
    {
      rolePrefix: 'insights_',
      items: [
        {
          title: 'dashboard',
          href: PATH_DASHBOARD.general.dashboard,
          icon: ICONS.dashboard,
          role: 'dashboard'
        }
      ]
    },
    // REPORTS
    // ----------------------------------------------------------------------
    {
      subheader: 'reports',
      rolePrefix: 'insights_',
      items: [
        {
          title: 'Composer',
          href: PATH_DASHBOARD.general.insightsReports,
          role: ROLE_REPORT_READ,
          icon: ICONS.components
        },
        {
          title: 'Organisational Health',
          href: PATH_DASHBOARD.general.insightsOrganisationalHealth,
          role: ROLE_ORGANIZATIONAL_HEALTH
        },
        {
          title: 'Productivity',
          href: PATH_DASHBOARD.general.insightsProductivity,
          role: ROLE_PRODUCTIVITY
        },
        {
          title: 'Application Usage',
          href: PATH_DASHBOARD.general.insightsApplicationUsage,
          role: ROLE_APPLICATION_USAGE
        },
        {
          title: 'Financial Outcomes',
          href: PATH_DASHBOARD.general.insightsFinancialOutlook,
          role: ROLE_FINANCIAL_OUTCOMES
        },
        {
          title: 'Pulse',
          href: PATH_DASHBOARD.general.insightsPulse,
          role: ROLE_PULSE
        },
        {
          title: 'Favorites',
          role: ROLE_REPORT_READ,
          icon: ICONS.bookmark,
          items: [...getBookmarkedItems(bookmarks)]
        }
      ]
    },

    // MANAGEMENT
    // ----------------------------------------------------------------------
    {
      subheader: 'management',
      rolePrefix: 'manage_',
      items: [
        {
          title: 'users',
          href: PATH_DASHBOARD.management.users,
          icon: ICONS.user,
          role: ROLE_USERS
        },
        {
          title: 'content',
          href: PATH_DASHBOARD.management.content,
          icon: ICONS.page,
          role: ROLE_CONTENT
        },
        {
          title: 'interest groups',
          href: PATH_DASHBOARD.management.interestGroups,
          icon: ICONS.elements,
          role: ROLE_INTEREST_GROUPS
        },
        {
          title: 'data sets',
          href: PATH_DASHBOARD.management.dataSetManagement,
          icon: ICONS.dataSetManagement,
          role: ROLE_REPORT_READ
        },
        {
          title: 'integrated reports',
          href: PATH_DASHBOARD.management.integratedReports,
          icon: ICONS.intergratedReports,
          role: ROLE_INTEGRATED_REPORTS_READ
        },
        {
          title: 'communications',
          href: PATH_DASHBOARD.management.communication,
          icon: ICONS.chat,
          role: ROLE_COMMUNICATION
        },
        {
          title: 'surveys',
          href: PATH_DASHBOARD.management.surveys,
          icon: ICONS.charts,
          role: ROLE_SURVEYS
        },
        {
          title: 'settings',
          href: PATH_DASHBOARD.management.platformSettings,
          icon: ICONS.settings,
          role: ROLE_SETTINGS
        }
      ]
    }
  ];

  return { MenuLinks };
}

export default sidebarconfig;
