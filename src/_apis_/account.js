import faker from 'faker';
import jwt from 'jsonwebtoken';
// utils
import mock from '../utils/mock';
import { codes } from '../utils/helpError';
import fakeRequest from '../utils/fakeRequest';

// ----------------------------------------------------------------------

const JWT_SECRET = 'experienz-secret-key';
const JWT_EXPIRES_IN = '5 days';

const users = [
  {
    id: '8864c717-587d-472a-929a-8e5f298024da-0',
    displayName: 'Jaydon Smith',
    firstName: 'Jaydon',
    email: 'jaydon@experienz.co.uk',
    password: 'demo1234',
    phoneNumber: '+40 777666555',
    country: 'United States',
    address: '90210 Broadway Blvd',
    state: 'California',
    city: 'San Francisco',
    zipCode: '94116',
    about: '',
    role: 'admin',
    roles: [
      'dashboard',
      'manage_interest_groups',
      'insights_organizational_health',
      'insights_productivity',
      'insights_application_usage',
      'insights_financial_outcomes',
      'insights_pulse',
      'insights_reports_create',
      'insights_reports_read',
      'offline_access',
      'manage_users',
      'manage_settings',
      'uma_authorization',
      'manage_content',
      'admin-portal-access',
      'manage_surveys',
      'manage_communications',
      'manage_datasets_read',
      'manage_datasets_write',
      'integrated_reports_read',
      'integrated_reports_write',
      'supplier-portal-access'
    ],
    isPublic: true
  }
];

// ----------------------------------------------------------------------

mock.onPost('/api/user/login').reply(async (config) => {
  try {
    await fakeRequest(1000);
    const { username: email, password, firstName } = JSON.parse(config.data);
    const user = users.find((_user) => _user.email === email);

    if (!user) {
      return [400, { errorDesc: codes.userNotFound.code }];
    }

    if (user.password !== password) {
      return [400, { errorDesc: codes.wrongPassword.code }];
    }

    const accessToken = jwt.sign(
      {
        userId: user.id,
        client_name: 'experienz',
        client_domain: 'experienz.co.uk',
        firstName: firstName
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN
      }
    );

    return [200, { data: { accessToken, user } }];
  } catch (error) {
    console.error(error);
    return [500, { errorDesc: 'Internal server error' }];
  }
});

// ----------------------------------------------------------------------

mock.onPost('/api/user/register').reply(async (config) => {
  try {
    await fakeRequest(1000);

    const { email, password, firstName, lastName } = JSON.parse(config.data);
    let user = users.find((_user) => _user.email === email);

    if (user) {
      return [400, { errorDesc: codes.emailAlreadyinUse.code }];
    }

    user = {
      id: faker.datatype.uuid(),
      displayName: `${firstName} ${lastName}`,
      firstName: firstName,
      email,
      password,
      photoURL: null,
      phoneNumber: null,
      country: null,
      address: null,
      state: null,
      city: null,
      zipCode: null,
      about: null,
      role: 'user',
      isPublic: true
    };

    const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });

    return [200, { accessToken, user }];
  } catch (error) {
    console.error(error);
    return [500, { errorDesc: 'Internal server error' }];
  }
});

// ----------------------------------------------------------------------

mock.onGet('/api/user/info').reply((config) => {
  try {
    const { Authorization } = config.headers;

    if (!Authorization) {
      return [401, { errorDesc: 'Authorization token missing' }];
    }

    const accessToken = Authorization.split(' ')[1];
    const { userId } = jwt.verify(accessToken, JWT_SECRET);
    const user = users.find((_user) => _user.id === userId);

    if (!user) {
      return [401, { errorDesc: 'Invalid authorization token' }];
    }

    return [200, { data: { ...user } }];
  } catch (error) {
    console.error(error);
    return [500, { errorDesc: 'Internal server error' }];
  }
});

mock.onPut('/api/user/reset-password').reply(200, {});

mock.onPost('/api/supplier/registration').reply(async (request) => {
  await fakeRequest(1000);
  return [200, { status: 'success' }];
});
