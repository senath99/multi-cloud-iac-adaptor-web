import faker from 'faker';
import { sample } from 'lodash';
// utils
import mock from '../utils/mock';
import { reject } from 'lodash';
import fakeRequest from '../utils/fakeRequest';

// ----------------------------------------------------------------------

const ADMIN_PORTAL_PERMISSION_GROUPS = [
  {
    id: `fc68bad5-d430-4033-b8f8-4bc069dc0ba1-${1}`,
    name: 'Report_Admins'
  },
  {
    id: `fc68bad5-d430-4033-b8f8-4bc069dc0ba2-${2}`,
    name: 'Basic_Users'
  },
  {
    id: `fc68bad5-d430-4033-b8f8-4bc069dc0ba3-${3}`,
    name: 'ESG_Managers'
  }
];

const ADMIN_PORTAL_PERMISSIONS = [
  {
    id: `fc68bad5-d430-4033-b8f8-4bc069dc0ba0-${0}`,
    name: 'insights_organizational_health',
    description:
      'This grants access to insights for organizatonal health related data across the Dashboard and Insights > Organisational Health.'
  },
  {
    id: `fc68bad5-d430-4033-b8f8-4bc069dc0ba0-${1}`,
    name: 'insights_productivity',
    description:
      'This grants access to insights within Insights > Productivity/Presenteeism, as responses to WLQ questionnaire.'
  },
  {
    id: `fc68bad5-d430-4033-b8f8-4bc069dc0ba0-${2}`,
    name: 'insights_application_usage',
    description:
      'This grants access to insights within Dashboard and Insights > Application Usage and Contribution, collected via behavioural statistics on the mobile application.'
  },
  {
    id: `fc68bad5-d430-4033-b8f8-4bc069dc0ba0-${3}`,
    name: 'insights_financial_outcomes',
    description:
      'This grants access to insights within Dashboard and Insights > Financial Outcomes, including ocst of absenteeism, presenteism and attrition.'
  },
  {
    id: `fc68bad5-d430-4033-b8f8-4bc069dc0ba0-${4}`,
    name: 'insights_pulse',
    description:
      'This grants access to insights within and Insights > Pulse, data collected via the pulse questionnaire.'
  },
  {
    id: `fc68bad5-d430-4033-b8f8-4bc069dc0ba0-${5}`,
    name: 'manage_users',
    description:
      'This grants access to section manage users, which allows adminstration of platform users.'
  },
  {
    id: `fc68bad5-d430-4033-b8f8-4bc069dc0ba0-${6}`,
    name: 'manage_interest_groups',
    description:
      'This grants access to section manage interest groups, which allows adminstration of interest groups.'
  },
  {
    id: `fc68bad5-d430-4033-b8f8-4bc069dc0ba0-${7}`,
    name: 'manage_settings',
    description:
      'This grants access to section manage settings, which allows adminstration of master settings for the client including welcome screens, applicable segments and their descriptions.'
  },
  {
    id: `fc68bad5-d430-4033-b8f8-4bc069dc0ba0-${8}`,
    name: 'manage_content',
    description:
      'This grants access to section manage content, which allows adminstration of news, digital resources.'
  },
  {
    id: `fc68bad5-d430-4033-b8f8-4bc069dc0ba0-${9}`,
    name: 'manage_surveys',
    description:
      'This grants access to section manage surveys, which allows adminstration of standard and non standard surveys and their schedules within the organisation.'
  },
  {
    id: `fc68bad5-d430-4033-b8f8-4bc069dc0ba0-${10}`,
    name: 'manage_communications',
    description:
      'This grants access to section manage communications, which allows the users to respond to questions and respond to requests rasied by other employees/users.'
  },
  {
    id: `fc68bad5-d430-4033-b8f8-4bc069dc0ba0-${11}`,
    name: 'admin-portal-access',
    description: 'This grants the basic access to login to the admin portal '
  }
];

const DATA_RESTRICTIONS = [
  {
    name: 'company',
    value: ['Company 1', 'Company 2', 'Company 3', 'Company 4']
  },
  {
    name: 'location',
    value: ['Location 1', 'Location 2', 'Location 3', 'Location 4']
  },
  {
    name: 'department',
    value: ['Department 1', 'Department 2', 'Department 3', 'Department 4']
  }
];

const userPermissions = {
  data: [...ADMIN_PORTAL_PERMISSIONS]
};

// ----------------------------------------------------------------------

let users = [...Array(24)].map((_, index) => {
  const setIndex = index + 1;
  return {
    id: setIndex,
    userName: faker.internet.userName().toLowerCase(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email().toLowerCase(),
    status: sample(['active', 'inactive']),
    roles: [sample(ADMIN_PORTAL_PERMISSIONS).name],
    groups: [sample(ADMIN_PORTAL_PERMISSION_GROUPS).name],
    createdAt: faker.date.past(),
    employeeData: [sample(DATA_RESTRICTIONS)],
    groupRoles: [sample(ADMIN_PORTAL_PERMISSIONS).name]
  };
});

let countries = [
  {
    id: 1,
    country: 'Sri Lanka'
  },
  {
    id: 2,
    country: 'UK'
  }
];

const COUNTRIES = {
  data: [...countries]
};

const attributes = {
  data: [...DATA_RESTRICTIONS]
};

mock.onGet('/api/user').reply(async () => {
  await fakeRequest(1000);
  return [200, { data: [...users] }];
});

// ----------------------------------------------------------------------

mock.onGet('/api/user/roles').reply(async (config) => {
  try {
    return [200, { ...userPermissions }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

mock.onPut(/^\/api\/user\/[^\/]+/).reply(async (request) => {
  await fakeRequest(1000);
  try {
    return [200, { data: [] }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

// ----------------------------------------------------------------------

mock.onPost('/api/user').reply(async (request) => {
  await fakeRequest(1000);
  try {
    await fakeRequest(2000);
    return [200, { data: [] }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

mock.onGet('/api/settings/countries').reply(async () => {
  await fakeRequest(1000);
  try {
    return [200, { ...COUNTRIES }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

mock.onGet('/api/user/filters').reply(async () => {
  await fakeRequest(1000);
  try {
    return [200, { ...attributes }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

mock.onGet(/^\/api\/user\/\d+/).reply(async (request) => {
  await fakeRequest(1000);
  try {
    const userId = Number(request.url.split('/').slice(-1)[0]);
    const editUser = users.find((_user) => _user.id === userId);
    if (!editUser) {
      return [404, { ...{ data: { message: 'user not found' } } }];
    }
    return [200, { ...{ data: editUser } }];
  } catch (error) {
    return [500, { message: 'Internal server error' }];
  }
});
