// utils
import mock from '../utils/mock';
import fakeRequest from '../utils/fakeRequest';

mock.onPost('api/verify-registration').reply(async (request) => {
  await fakeRequest(3000);
  return [200, { data: [] }];
});
