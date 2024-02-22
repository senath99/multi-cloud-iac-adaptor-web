/*
 * Project: Dynamedics Supplier Portal Web
 * Created Date: Thursday April 13th 2023
 * Author: senath999
 * -----
 * Last Modified: Thursday April 13th 2023 12:04:27 am
 * Modified By: senath999 at <you@you.you>
 * -----
 * Copyright (c) 2023 Mitra Sparks
 * -----
 * HISTORY:
 */

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DOCS = '/docs';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  page404: '/404',
  page500: '/500',
  page401: '/401'
};

export const PATH_HOME = {
  cloud: 'https://www.sketch.com/s/0fa4699d-a3ff-4cd5-a3a7-d851eb7e17f0',
  purchase: 'https://material-ui.com/store/items/minimal-dashboard/',
  components: '/components',
  dashboard: ROOTS_DASHBOARD
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    dashboard: path(ROOTS_DASHBOARD, ''),
    ruleAdd: path('', '/rule-form'),
    ruleEditPath: path('', '/rule-edit'),
    ruleEdit: path('', '/rule-edit/:stack')
  },
  dataSetManagement: {
    root: path('', '/esg-data'),
    uploadDataSets: path('', '/esg-data/upload-esg-data'),
    webForm: path('', '/esg-data/online-forms')
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
    labels: [
      path(ROOTS_DASHBOARD, '/mail/label/:customLabel/:mailId?'),
      path(ROOTS_DASHBOARD, '/mail/:systemLabel/:mailId?')
    ]
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    conversation: [
      path(ROOTS_DASHBOARD, '/chat/new'),
      path(ROOTS_DASHBOARD, '/chat/:conversationKey')
    ]
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  user: {
    root: path('', '/user'),
    profile: path('', '/user/profile'),
    management: path('', '/users/manage'),
    cards: path('', '/user/card'),
    list: path('', '/user/list'),
    account: path('', '/user/account')
  },
  content: {
    management: path(ROOTS_DASHBOARD, '/content/manage')
  },
  interestGroups: {
    management: path(ROOTS_DASHBOARD, '/interest-groups/manage')
  },
  management: {
    surveys: path('', '/management/surveys'),
    users: path('', '/management/users'),
    newUser: path('', '/management/users/add-user'),
    editUserRoot: path('', '/management/users/edit-user'),
    editUser: path('', '/management/users/edit-user/:id'),
    content: path('', '/management/content'),
    contentDetails: {
      digitalResource: path('', '/management/content?type=digital-resource'),
      news: path('', '/management/content?type=news'),
      container: path('', '/management/content?type=container')
    },
    interestGroups: path('', '/management/interest-groups'),
    interestGroupDetail: path('', '/management/interest-groups/:id'),
    newInterestGroup: path(
      '',
      '/management/interest-groups/add-interest-group'
    ),
    editInterestGroupRoot: path(
      '',
      '/management/interest-groups/edit-interest-group'
    ),
    editInterestGroup: path(
      '',
      '/management/interest-groups/edit-interest-group/:id'
    ),
    communication: path('', '/management/communication'),
    platformSettings: path('', '/management/platform-settings'),
    newDigitalResource: path('', '/management/content/add-digital-resource'),
    editDigitalResourceRoot: path(
      '',
      '/management/content/edit-digital-resource'
    ),
    editDigitalResource: path(
      '',
      '/management/content/edit-digital-resource/:id'
    ),
    newNews: path('', '/management/content/add-news'),
    editNewsRoot: path('', '/management/content/edit-news'),
    editNews: path('', '/management/content/edit-news/:id'),
    newContainer: path('', '/management/content/add-container'),
    editDigitalResourceContainerRoot: path(
      '',
      '/management/content/edit-digital-resource-container'
    ),
    editDigitalResourceContainer: path(
      '',
      '/management/content/edit-digital-resource-container/:id'
    ),
    dataSetManagement: path('', '/management/data-set'),
    integratedReports: path('', '/management/integrated-reports'),
    newIntegratedReportRoot: path(
      '',
      '/management/integrated-reports/add-integrated-report'
    ),
    newIntegratedReport: path(
      '',
      '/management/integrated-reports/add-integrated-report/:frameworkId'
    ),
    editIntegratedReportRoot: path(
      '',
      '/management/integrated-reports/edit-integrated-report'
    ),
    editIntegratedReport: path(
      '',
      '/management/integrated-reports/edit-integrated-report/:frameworkId/:id'
    ),
    reviewIntegratedReportRoot: path(
      '',
      '/management/integrated-reports/review-integrated-report'
    ),
    reviewIntegratedReport: path(
      '',
      '/management/integrated-reports/review-integrated-report/:frameworkId/:id'
    ),
    generateIntegratedReportRoot: path(
      '',
      '/management/integrated-reports/generate-integrated-report'
    ),
    generateIntegratedReport: path(
      '',
      '/management/integrated-reports/generate-integrated-report/:frameworkId/:id'
    ),
    uploadDataSets: path('', '/management/data-set/upload-data-set'),
    dataSetManagement: path('', '/management/data-set')
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    product: path(ROOTS_DASHBOARD, '/e-commerce/product/:name'),
    productById: path(
      ROOTS_DASHBOARD,
      '/e-commerce/product/nike-air-force-1-ndestrukt'
    ),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/e-commerce/invoice')
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    post: path(ROOTS_DASHBOARD, '/blog/post/:title'),
    postById: path(
      ROOTS_DASHBOARD,
      '/blog/post/portfolio-review-is-this-portfolio-too-creative'
    ),
    newPost: path(ROOTS_DASHBOARD, '/blog/new-post')
  },
  foundations: {
    root: path(ROOTS_DASHBOARD, '/foundations'),
    colors: path(ROOTS_DASHBOARD, '/foundations/colors'),
    typography: path(ROOTS_DASHBOARD, '/foundations/typography'),
    shadows: path(ROOTS_DASHBOARD, '/foundations/shadows'),
    grid: path(ROOTS_DASHBOARD, '/foundations/grid'),
    icons: path(ROOTS_DASHBOARD, '/foundations/icons')
  },
  components: {
    root: path(ROOTS_DASHBOARD, '/components'),
    accordion: path(ROOTS_DASHBOARD, '/components/accordion'),
    alert: path(ROOTS_DASHBOARD, '/components/alert'),
    autocomplete: path(ROOTS_DASHBOARD, '/components/autocomplete'),
    avatar: path(ROOTS_DASHBOARD, '/components/avatars'),
    badge: path(ROOTS_DASHBOARD, '/components/badges'),
    breadcrumbs: path(ROOTS_DASHBOARD, '/components/breadcrumbs'),
    buttons: path(ROOTS_DASHBOARD, '/components/buttons'),
    chip: path(ROOTS_DASHBOARD, '/components/chips'),
    dialog: path(ROOTS_DASHBOARD, '/components/dialogs'),
    textfield: path(ROOTS_DASHBOARD, '/components/text-fields'),
    label: path(ROOTS_DASHBOARD, '/components/labels'),
    lists: path(ROOTS_DASHBOARD, '/components/lists'),
    menu: path(ROOTS_DASHBOARD, '/components/menu'),
    pagination: path(ROOTS_DASHBOARD, '/components/pagination'),
    pickers: path(ROOTS_DASHBOARD, '/components/pickers'),
    popover: path(ROOTS_DASHBOARD, '/components/popover'),
    progress: path(ROOTS_DASHBOARD, '/components/progress'),
    rating: path(ROOTS_DASHBOARD, '/components/rating'),
    selectionControls: path(ROOTS_DASHBOARD, '/components/selection-controls'),
    snackbar: path(ROOTS_DASHBOARD, '/components/snackbars'),
    slider: path(ROOTS_DASHBOARD, '/components/slider'),
    stepper: path(ROOTS_DASHBOARD, '/components/steppers'),
    tabs: path(ROOTS_DASHBOARD, '/components/tabs'),
    table: path(ROOTS_DASHBOARD, '/components/table'),
    timeline: path(ROOTS_DASHBOARD, '/components/timeline'),
    tooltip: path(ROOTS_DASHBOARD, '/components/tooltips'),
    transferList: path(ROOTS_DASHBOARD, '/components/transfer-list'),
    treeView: path(ROOTS_DASHBOARD, '/components/tree-view'),

    // Extra
    extraComponents: path(ROOTS_DASHBOARD, '/extra-components'),
    chart: path(ROOTS_DASHBOARD, '/extra-components/chart'),
    map: path(ROOTS_DASHBOARD, '/extra-components/map'),
    editor: path(ROOTS_DASHBOARD, '/extra-components/editor'),
    copyToClipboard: path(
      ROOTS_DASHBOARD,
      '/extra-components/copy-to-clipboard'
    ),
    upload: path(ROOTS_DASHBOARD, '/extra-components/upload'),
    carousel: path(ROOTS_DASHBOARD, '/extra-components/carousel'),
    multiLanguage: path(ROOTS_DASHBOARD, '/extra-components/multi-language'),
    animate: path(ROOTS_DASHBOARD, '/extra-components/animate')
  }
};

export const PATH_DOCS = {
  root: ROOTS_DOCS,
  introduction: path(ROOTS_DOCS, '/introduction'),
  started: path(ROOTS_DOCS, '/getting-started'),
  package: path(ROOTS_DOCS, '/package'),

  // Theme UI
  color: path(ROOTS_DOCS, '/color'),
  typography: path(ROOTS_DOCS, '/typography'),
  icon: path(ROOTS_DOCS, '/icon'),
  shadows: path(ROOTS_DOCS, '/shadows'),
  components: path(ROOTS_DOCS, '/components'),
  tips: path(ROOTS_DOCS, '/tips'),

  // Development
  routing: path(ROOTS_DOCS, '/routing'),
  environmentVariables: path(ROOTS_DOCS, '/environment-variables'),
  stateManagement: path(ROOTS_DOCS, '/state-management'),
  apiCalls: path(ROOTS_DOCS, '/api-calls'),
  analytics: path(ROOTS_DOCS, '/analytics'),
  authentication: path(ROOTS_DOCS, '/authentication'),
  multiLanguage: path(ROOTS_DOCS, '/multi-language'),
  lazyload: path(ROOTS_DOCS, '/lazyload-image'),
  formHelper: path(ROOTS_DOCS, '/form-helper'),

  // Changelog
  support: path(ROOTS_DOCS, '/support'),
  changelog: path(ROOTS_DOCS, '/changelog')
};
