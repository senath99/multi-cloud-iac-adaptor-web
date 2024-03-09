import faker from 'faker';
// utils
import mock from '../utils/mock';
import fakeRequest from '../utils/fakeRequest';

// ----------------------------------------------------------------------

mock.onPut('/api/data-sets/instance/save').reply(async (request) => {
  try {
    // await fakeRequest(10000);

    return [200, { data: {} }];
  } catch (error) {
    return [500, { message: 'Internal server error' }];
  }
});

mock.onPost('/api/data-sets/validate').reply(async (request) => {
  try {
    await fakeRequest(5000);

    return [
      200,
      {
        data: {
          allow: 0,
          violations: [
            'Required tag value is missing for tag key: environment. Valid values are {"nonprod", "prod"}.',
            'SSH port 22 is not allowed'
          ],
          warnings: [
            'By applying, you are about to destroy 1 resources from the existing stack.'
          ]
        }
      }
    ];
  } catch (error) {
    return [500, { message: 'Internal server error' }];
  }
});
