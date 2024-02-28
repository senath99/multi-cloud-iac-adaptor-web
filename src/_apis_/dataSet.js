import faker from 'faker';
// utils
import mock from '../utils/mock';
import fakeRequest from '../utils/fakeRequest';

// ----------------------------------------------------------------------

mock.onPut('/api/data-sets/instance/save').reply(async (request) => {
  try {
    // await fakeRequest(10000);

    console.log('TESSSST' + JSON.stringify(request));
    return [200, { data: {} }];
  } catch (error) {
    return [500, { message: 'Internal server error' }];
  }
});
