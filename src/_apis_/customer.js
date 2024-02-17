import mock from './mock';

const CUSTOMERS_LIST = [
  { name: 'Silverstone', clientId: 4 },
  { name: 'experienz Ltd', clientId: 6 },
  { name: 'Mitra Innovation', clientId: 7 },
  { name: 'Sarvodaya Development Finance', clientId: 8 }
];

const customers = { data: [...CUSTOMERS_LIST] };

// ----------------------------------------------------------------------

mock.onGet('/api/supplier/customers').reply(async (config) => {
  try {
    return [200, { ...customers }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});
