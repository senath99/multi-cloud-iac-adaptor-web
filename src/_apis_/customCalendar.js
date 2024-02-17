import mock from './mock';
import fakeRequest from '../utils/fakeRequest';

const EVENTS_LIST = [
  {
    id: 1,
    name: 'MotoGP',
    description: 'MotoGP Apr',
    status: 1,
    from: '2023-04-01T10:00:00.000Z',
    to: '2023-04-03T18:00:00.000Z',
    segment: 'FIA',
    createdBy: null,
    modifiedBy: null,
    createdOn: '2023-03-16T21:26:14.000Z',
    modifiedOn: '2023-03-16T22:04:26.000Z'
  },
  {
    id: 2,
    name: 'Formula 01',
    description: 'Launch of a new product line',
    status: 1,
    from: '2023-04-01T10:00:00.000Z',
    to: '2023-04-03T18:00:00.000Z',
    segment: 'FIA',
    createdBy: null,
    modifiedBy: null,
    createdOn: '2023-03-16T21:32:32.000Z',
    modifiedOn: '2023-03-16T21:32:32.000Z'
  },
  {
    id: 4,
    name: "Performer's night",
    description: 'sample',
    status: 1,
    from: '2023-03-21T09:24:20.000Z',
    to: '2023-03-30T09:24:20.000Z',
    segment: 'FIA',
    createdBy: null,
    modifiedBy: null,
    createdOn: '2023-03-17T09:36:55.000Z',
    modifiedOn: '2023-03-17T09:36:55.000Z'
  },
  {
    id: 5,
    name: 'Formula 02',
    description: 'Formula 2023',
    status: 1,
    from: '2023-03-22T15:55:14.000Z',
    to: '2023-03-22T15:55:14.000Z',
    segment: 'FIA 2023',
    createdBy: null,
    modifiedBy: null,
    createdOn: '2023-03-22T15:56:10.000Z',
    modifiedOn: '2023-03-22T15:56:10.000Z'
  },
  {
    id: 6,
    name: 'Britcar Trophy',
    description: '',
    status: 1,
    from: '2023-03-25T16:11:19.000Z',
    to: '2023-03-30T16:11:19.000Z',
    segment: 'Britcar Festival 2023',
    createdBy: null,
    modifiedBy: null,
    createdOn: '2023-03-22T16:13:13.000Z',
    modifiedOn: '2023-03-22T16:13:13.000Z'
  },
  {
    id: 7,
    name: 'British GT',
    description: '',
    status: 1,
    from: '2023-03-22T16:17:31.000Z',
    to: '2023-03-30T16:17:31.000Z',
    segment: 'British GT 2023',
    createdBy: null,
    modifiedBy: null,
    createdOn: '2023-03-22T16:18:27.000Z',
    modifiedOn: '2023-03-22T16:18:27.000Z'
  }
];

const events = { data: [...EVENTS_LIST] };

// ----------------------------------------------------------------------

mock.onGet(`api/custom-calendar/event`).reply(async (config) => {
  await fakeRequest(1000);
  try {
    return [200, { ...events }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});
