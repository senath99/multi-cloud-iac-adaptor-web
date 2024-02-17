import AxiosMockAdapter from 'axios-mock-adapter';
// utils
import axios from '../utils/axios';

// ----------------------------------------------------------------------

const axiosMockAdapter = new AxiosMockAdapter(axios, {
  delayResponse: 0,
  onNoMatch: 'passthrough'
});

export default axiosMockAdapter;
